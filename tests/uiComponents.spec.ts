import {test, expect} from "@playwright/test"

//test.describe.configure({mode: 'parallel'})

test.beforeEach( async({page}) =>{

    await page.goto('/')

})

test.describe('Form Layouts Page @block', ()=> {
    //test.describe.configure({retries: 2})

    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async({page}, testInfo) =>{
        
        if (testInfo.retry){
            //Do something...
        }

        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')        
        await usingTheGridEmailInput.clear()
        //Simulate the user's keystroke.
        //await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})
        await usingTheGridEmailInput.pressSequentially('test2@test.com')

        //Generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('Radio buttons', async({page}) =>{
        const usingTheGridRadioButton = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio', {name: "Option 1"})

        await usingTheGridRadioButton.check({force: true})
        const statusRadio = await usingTheGridRadioButton.isChecked()
        expect(statusRadio).toBeTruthy()
        await expect(usingTheGridRadioButton).toBeChecked()

        //Assetions to validate the change of the selecction
        await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy
        expect(await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy
    })

})

test('Checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    //Forcing the click on a checkbox when its visibility is hidden
    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true, delay: 500})
    await page.waitForTimeout(1000)
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
    await page.waitForTimeout(1000)
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).click({force: true, delay: 500})

    //await page.getByRole('checkbox', {name: "Show toast with icon"}).click({force: true, delay: 500})
    
    const radioButtonHideOnClick = await page.getByRole('checkbox', {name: "Hide on click"}).isChecked()
    const radioButtonPrevent = await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).isChecked()
    const radioButtonShow = await page.getByRole('checkbox', {name: "Show toast with icon"}).isChecked()

    //console.log(radioButtonHideOnClick)
    //console.log(radioButtonPrevent)
    //console.log(radioButtonShow)

    if (!radioButtonHideOnClick) {
        await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true})
    } else await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})

    if (!radioButtonPrevent) {
        await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})
    } else await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).uncheck({force: true})

    if (!radioButtonShow) {
        await page.getByRole('checkbox', {name: "Show toast with icon"}).check({force: true})
    } else await page.getByRole('checkbox', {name: "Show toast with icon"}).uncheck({force: true})

    //Array from the checkboxes and assertion to verify the checked status for each one.
    await page.waitForTimeout(3000)
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
         //await box.check({force: true})         
         //expect(await box.isChecked()).toBeTruthy()
         await box.uncheck({force: true})
         expect(await box.isChecked()).toBeFalsy()
    }

})

test('Lists and Dropdowns', async({page}) =>{

    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    //page.getByRole('list') //When the list has a ul tag
    //page.getByRole('listitem') //When the list has a li tag

    const optionList = page.locator('nb-option-list nb-option')
    //Validating the list has all the elements
    await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])

    await optionList.filter({hasText: "Cosmic"}).click()
    //await page.waitForTimeout(2000)
    //await optionList.filter({hasText: "Light"}).click()
    //await page.waitForTimeout(2000)
    //await optionList.filter({hasText: "Corporate"}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
       "Light" : "rgb(255, 255, 255)",
       "Dark"  : "rgb(34, 43, 69)",
       "Cosmic": "rgb(50, 50, 89)",
       "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()
    for (const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color  != "Corporate"){
            await dropDownMenu.click()
        }
    }
})

test('Tooltips', async({page}) =>{
    
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    //const toolTipCard = page.locator('nb-card').getByText('Tooltip Placements')
    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    page.getByRole('tooltip') //if you have a role tooltip created

    const tooltipText = await page.locator('nb-tooltip').textContent()
    expect(tooltipText).toEqual('This is a tooltip')

})

test('Dialog box', async({page}) =>{

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //This is way how to hande the dialog box in playwright.
    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr',{hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    
})

test('Web tables', async({page}) =>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1. Get the row by any test in this row, taking into account the email and modifying the age.
    //const targetRow = page.locator('table').locator('tr', {hasText: "twitter@outlook.com"})
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill("35")
    await page.locator('.nb-checkmark').click()

    //2. Finding a row by unique ID and modify the email.
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill("test@test.com")
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    //3. Test filter of the table
    const ages = ["20","30","40","200"]

    for (let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for(let ageRow of await ageRows.all()){
            const cellValue = await ageRow.locator('td').last().textContent()

            if (age == "200"){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {                
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Datepicker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 165)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

    //Searching for the right date
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
         await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
         calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    //await page.locator('[class="day-cell ng-star-inserted"]').getByText('14').click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)
})

test('Sliders', async({page}) =>{
   //Update attribute
   //const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
   //await tempGauge.evaluate( node => {
   //      node.setAttribute('cx', '100')
   //      node.setAttribute('cy', '100')
   // }
   //)
   //await tempGauge.click()
   
   //Mouse movement
   const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
   await tempBox.scrollIntoViewIfNeeded()

   const box = await tempBox.boundingBox()
   const x = box.x + box.width / 2
   const y = box.y + box.height / 2
   await page.mouse.move(x,y)
   await page.mouse.down()
   await page.mouse.move(x + 100, y)
   await page.waitForTimeout(500)
   await page.mouse.move(x + 100, y + 100)
   await page.mouse.up()
   await expect(tempBox).toContainText('30')
})