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