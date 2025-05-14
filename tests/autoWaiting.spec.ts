import {test, expect} from "@playwright/test"

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    //testInfo.setTimeout(testInfo.timeout + 20000)
})

test('Auto waiting', async({page}) => {
    
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    //const text = await successButton.textContent()
    
    ///await successButton.waitFor({state: "attached"})
    ///const text = await successButton.allTextContents()
    //expect(text).toEqual('Data loaded with AJAX get request.')
    ///expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 60000})
})

test.skip('Alternatives waits', async({page}) =>{
    const successButton = page.locator('.bg-success')

    //Waits for element
    //await page.waitForSelector('.bg-success')

    //Waits for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //Waits for network calls to be completed. ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test.skip('Timeouts', async({page}) =>{
    //test.setTimeout(20000)
    test.slow() //Increase the timeout 3 times.
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 2000})
    //await successButton.click()
})