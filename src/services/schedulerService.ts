import cron from 'node-cron';
import axios from 'axios';
import { config } from '../config/env.ts';

/**
 * Makes a POST request to the /automation endpoint
 * with the record file names passed as console arguments
 */
async function verifyRecords(): Promise<void> {
  try {
    // Get the record file names from the command line arguments
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
      console.error('Two record files are required as parameters.');
      return;
    }

    const record1 = args[0];
    const record2 = args[1];

    console.log(`Verifying records: ${record1} and ${record2}`);

    // Endpoint URL
    const url = `http://localhost:${config.port}/api/automation`;

    // Make the POST request
    const response = await axios.post(url, {
      folio1: record1,
      folio2: record2
    });

    console.log('Record verification response:', response.data);
  } catch (error) {
    console.error('Error verifying records:', error);
  }
}

/**
 * Starts a cron job that executes the record verification every 10 minutes
 */
export function startCronJob(): void {
  console.log('Starting cron job to verify records every 10 minutes...');
  
  // Execute immediately when the server starts
  verifyRecords();
  
  // Schedule execution every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    console.log('Executing scheduled record verification...');
    verifyRecords();
  });
} 