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

})