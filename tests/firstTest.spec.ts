import {test, expect} from '@playwright/test'

test.beforeEach( async({page}) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({page}) => {    
    
    //By tag name
    await page.locator('input').first().click()

    //By ID
    page.locator('#inputEmail1')

    //By Class value
    page.locator('.shape-rectangle')

    //By Attribute
    page.locator('[placeholder="Email"]')

    //By Class value (Full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //Combine different selectors
    page.locator ('input[placeholder="Email"][nbinput]')

    //By XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //By partial text match
    page.locator(':text("Using")')

    //By exact text match
    page.locator(':text-is("Using the Grid")')
})

test('User facing locators', async({page}) =>{

    await page.getByRole('textbox',{name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByTestId('Signin').click()
    await page.getByText('Using the Grid').click()

})

test('Locating child elements', async({page})=>{
    
   await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

   await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()
   await page.locator('nb-card').nth(3).getByRole('button').click()
    
})

test('Locating parents elements', async({page})=> {

    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1') }).getByRole('textbox', {name: "Email"}).click()
    
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox', )}).filter({hasText: "Sign in"}).getByRole('textbox',{name: "Email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox',{name: "PASSWORD"}).click()

})

test('Reusing locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passwordField = basicForm.getByRole('textbox', {name: "Password"})

    await emailField.fill('test@test.com')
    await passwordField.fill('welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {name: "Submit"}).click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async({page}) =>{

    //Single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //All text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents() 
    expect(allRadioButtonsLabels).toContain('Option 2')

    //Input value o selected value from a control o html tag
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //Getting value of an attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})