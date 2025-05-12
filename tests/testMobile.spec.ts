import {test, expect} from '@playwright/test'


test('Input Fields', async({page}, testInfo) =>{
        
        //await page.goto('http://localhost:4200')
        await page.goto('/')
        if (testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click()
        }
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        if (testInfo.project.name == 'mobile'){
            await page.locator('.sidebar-toggle').click()
        }

        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

        await usingTheGridEmailInput.fill('test@test.com')   
        await page.waitForTimeout(500)     
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