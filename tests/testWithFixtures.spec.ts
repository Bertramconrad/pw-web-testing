import {test} from '../test-options'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'
//import {NavigationPage} from '../page-objects/navigationPage'
//import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
//import { DatePickerPage } from '../page-objects/datePickerPage'

/* test.beforeEach( async({page}) =>{
    await page.goto('/')
}) */

test('Parametrized method', async ({pageManager}) =>{
    //const pm = new PageManager(page)
    //const randomFullName = faker.person.fullName()
    const randomName = faker.person.firstName()
    const randomLastName = faker.person.lastName()
    const randomFullName = `${randomName} ${randomLastName}`
    const randomEmail = `${randomName}${randomLastName}${faker.number.int(1000)}@test.com`

    //const navigateTo = new NavigationPage(page)
    //const onFormLayoutsPage = new FormLayoutsPage(page)
    //const onDatePickerPage = new DatePickerPage(page)

    //await pm.navigateTo().formLayoutsPage()
    //await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 2')
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME,process.env.PASSWORD,'Option 2')
    //await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await pageManager.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})