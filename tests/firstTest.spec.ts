import {test} from '@playwright/test'

test.beforeEach( async({page}) => {
    await page.goto('http://localhost:4200')
})

test('Navigate to form layouts', async ({page}) => {    
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Navigate to datepicker page', async ({page}) => {    
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

test.describe('Suite 1', () => {
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
    })

    test('Navigate to form layouts', async ({page}) => {    
        await page.getByText('Form Layouts').click()
    })
    
    test('Navigate to datepicker page', async ({page}) => {    
        await page.getByText('Datepicker').click()
    })

})