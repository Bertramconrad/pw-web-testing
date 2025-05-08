import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
//import {NavigationPage} from '../page-objects/navigationPage'
//import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
//import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach( async({page}) =>{
    await page.goto('http://localhost:4200/')
})

test('Navigate to Form Page', async({page}) =>{
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

test('Parametrized method', async ({page}) =>{
    const pm = new PageManager(page)
    //const navigateTo = new NavigationPage(page)
    //const onFormLayoutsPage = new FormLayoutsPage(page)
    //const onDatePickerPage = new DatePickerPage(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','welcome1','Option 2')
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox('Daniel Riveros', 'test@test.com', true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6,15)

})