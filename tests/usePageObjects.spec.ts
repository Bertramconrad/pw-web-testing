import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach( async({page}) =>{
    await page.goto('http://localhost:4200/')
})

test('Navigate to Form Page', async({page}) =>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Parametrized method', async ({page}) =>{
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com','welcome1','Option 2')
    await onFormLayoutsPage.submitInLineFormWithNameEmailAndCheckbox('Daniel Riveros', 'test@test.com', true)
    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(10)
    await onDatePickerPage.selectDatePickerWithRangeFromToday(6,15)

})