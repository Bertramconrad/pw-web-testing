import {Page, expect} from "@playwright/test"

export class DatePickerPage{

    private readonly page: Page

    constructor(page: Page){                
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){

            const calendarInputField = this.page.getByPlaceholder('Form picker')
            await calendarInputField.click()        
            const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
            await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDateFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()  
        const dateToAssertStart = await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDateFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
    
        //Searching for the right date
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
             await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
             calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
    
        //await page.locator('[class="day-cell ng-star-inserted"]').getByText('14').click()
        //await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        //The next instruction changed to improve the locator to make it function to both, common and range picker date.
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
        
    }
}