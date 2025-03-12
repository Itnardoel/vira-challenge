import { chromium, type Browser } from 'playwright';

/**
 * Performs the login process on the platform
 * @param email Email to login
 * @param password Password to login
 * @returns Object with the browser and login status
 */
async function login(email: string = 'test@test.test', password: string = '12345678'): Promise<{browser: Browser, success: boolean}> {
  // Launch the browser
  const browser = await chromium.launch(/*{
    headless: false, // Visible mode to see the automation
    slowMo: 50, // Slow down actions for better visualization
  }*/);

  let success = false;

  try {
    // Open a new page
    const page = await browser.newPage();
    
    // Navigate to the login page
    await page.goto('https://panel-dev.viradoctores.com');
    
    console.log('Page loaded, starting login process...');
    
    // Wait for the login form to be visible
    await page.waitForSelector('input[type="email"]');
    
    // Enter credentials
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    
    // Click the login button
    await page.click('button[type="submit"]');
    
    // Wait for the error message to appear
    try {
      // Try to find the invalid credentials error message
      const errorSelector = 'div.text-sm.font-semibold:has-text("auth/invalid_credentials")';
      await page.waitForSelector(errorSelector, { timeout: 5000 });
      
      // Check if the message contains the expected text
      const errorText = await page.textContent('div.text-sm.opacity-90');
      if (errorText && errorText.includes('Usuario o contraseña incorrectos')) {
        console.log('✅ Process completed successfully');
        success = true;
      }
    } catch (error) {
      console.log('❌ Could not login successfully');
    }
    
    return { browser, success };
    
  } catch (error) {
    console.error('Error during automation:', error);
    await browser.close();
    throw error;
  }
}

// Export functions to be used from other files
export { login }; 