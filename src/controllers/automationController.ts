import { type Request, type Response } from 'express';
import { login } from '../services/authService.ts';
import { readFiles, updateFiles } from '../services/fileService.ts';
import { sendTelegramNotification } from '../services/notificationService.ts';
import { uploadFeeLetter } from '../services/feeLetterService.ts';

/**
 * Controller for automating the record verification process
 * @param req Express request
 * @param res Express response
 */
export async function automateRecordVerification(req: Request, res: Response) {
  try {
    // Get the record files from the request body
    const { folio1, folio2 } = req.body;
    
    if (!folio1 || !folio2) {
      res.status(400).json({ 
        success: false, 
        message: 'Two record files are required in the request body' 
      });
      return;
    }

    // Perform login
    const { browser, success: loginSuccess } = await login();
   
    if (!loginSuccess) {
      await browser.close();
      res.status(401).json({ 
        success: false, 
        message: 'Could not login successfully' 
      });
      return; 
    }
    
    console.log('Login successful, processing records...');

    const { 
      record1: record1Content, 
      record2: record2Content, 
      success: readFilesSuccess 
    } = readFiles(folio1, folio2);
    
    // Verify that the files exist
    if (!readFilesSuccess) {
      await browser.close();
      console.log('Browser closed after failing to read records');

      res.status(400).json({ 
        success: false, 
        message: 'One or both record files do not exist' 
      });
      return;
    }

    // Update the status of the records
    if (record1Content && record1Content.includes('Estado: pendiente')) {
      updateFiles(folio1, record1Content);
      console.log('Record 1 updated to submitted');
      sendTelegramNotification(`Record 1 updated to submitted`);
    } else if (record2Content && record2Content.includes('Estado: pendiente')) {
      updateFiles(folio2, record2Content);
      console.log('Record 2 updated to submitted');
      sendTelegramNotification(`Record 2 updated to submitted`);
    } else {
      sendTelegramNotification(`Both records are already submitted`);
      const claimNumber = uploadFeeLetter();
      console.log(`Fee letter generated with claim number: ${claimNumber}`);
      sendTelegramNotification(`Fee letter generated with claim number: ${claimNumber}`);
    }

    // Close the browser once processing is complete
    browser.close();
    console.log('Browser closed after processing all records');
    
    // Return the results
    res.json({
      success: true,
      message: 'Records processed successfully',
    });  
    
  } catch (error) {
    console.error('Error in login and verification process:', error);
    
    res.status(500).json({ 
      success: false, 
      message: 'Error in login and verification process', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
} 