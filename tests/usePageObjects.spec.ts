import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";
//import {NavigationPage} from '../page-objects/navigationPage'
//import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
//import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach( async({page}) =>{
    await page.goto('/')
})

test('Navigate to Form Page @smoke @regression', async({page}) =>{
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page)
    //await navigateTo.formLayoutsPage()
    //await navigateTo.datePickerPage()
    //await navigateTo.smartTablePage()
    //await navigateTo.toastrPage()
    //await navigateTo.tooltipPage()
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parametrized method @smoke', async ({page}) =>{
    const pm = new PageManager(page)
    //const randomFullName = faker.person.fullName()
    const randomName = faker.person.firstName()
    const randomLastName = faker.person.lastName()
    const randomFullName = `${randomName} ${randomLastName}`
    const randomEmail = `${randomName}${randomLastName}${faker.number.int(1000)}@test.com`

    //const navigateTo = new NavigationPage(page)
    //const onFormLayoutsPage = new FormLayoutsPage(page)
    //const onDatePickerPage = new DatePickerPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 2')
    //await page.screenshot({path: 'screenshots/formLayoutsPage.png'})
    //const buffer = page.screenshot()
    //console.log((await buffer).toString('base64'))
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    //await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/formInLinePage.png'})
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(1,2)

})

test('Testing With ARGOS CI', async({page}) =>{
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page)
    //await navigateTo.formLayoutsPage()
    //await navigateTo.datePickerPage()
    //await navigateTo.smartTablePage()
    //await navigateTo.toastrPage()
    //await navigateTo.tooltipPage()
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "formLayouts Page")
    //await argosScreenShot(page, "form Layouts Page")
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "datePicker Page")
    //await argosScreenShot(page, "datepicker Page")
    //await pm.navigateTo().smartTablePage()
    //await pm.navigateTo().toastrPage()
    //await pm.navigateTo().tooltipPage()
})