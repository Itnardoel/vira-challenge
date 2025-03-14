import cron from 'node-cron';
import axios from 'axios';
import { config } from '../config/env.ts';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/**
 * Makes a POST request to the /automation endpoint
 * with the record file names provided by user input
 */
async function verifyRecords(): Promise<void> {
  try {
    // Create readline interface
    const rl = readline.createInterface({ input, output });
    
    // Ask for the first record file name
    const record1 = await rl.question('Ingrese el nombre del primer folio: ');
    
    // Ask for the second record file name
    const record2 = await rl.question('Ingrese el nombre del segundo folio: ');
    
    // Close the readline interface
    rl.close();

    console.log(`Verificando folios: ${record1} y ${record2}`);

    // Endpoint URL
    const url = `http://localhost:${config.port}/api/automation`;

    // Make the POST request
    const response = await axios.post(url, {
      folio1: record1,
      folio2: record2
    });

    console.log('Respuesta de verificación de folios:', response.data);
  } catch (error) {
    console.error('Error al verificar folios:', error);
  }
}

/**
 * Starts a cron job that executes the record verification every 10 minutes
 */
export function startCronJob(): void {
  console.log('Iniciando trabajo cron para verificar folios cada 10 minutos...');
  
  // Execute immediately when the server starts
  // verifyRecords();
  setTimeout(() => {
    verifyRecords();
  }, 1000);
  
  // Schedule execution every 10 minutes
  cron.schedule('*/10 * * * *', () => {
    console.log('Ejecutando verificación programada de folios...');
    verifyRecords();
  });
} 