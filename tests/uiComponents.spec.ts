import {test, expect} from "@playwright/test"

test.beforeEach( async({page}) =>{

    await page.goto('http://localhost:4200/')

})

test.describe('Form Layouts Page', ()=> {

    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input Fields', async({page}) =>{
        
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')        
        await usingTheGridEmailInput.clear()
        //Simulate the user's keystroke.
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})

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