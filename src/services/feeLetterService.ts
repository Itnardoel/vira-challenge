import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Creates a new fee letter in txt format and returns the generated claim number
 * @returns {string} Generated claim number for the fee letter
 */
export function uploadFeeLetter(): string {
  try {
    // Generate a unique claim number
    const claimNumber = generateClaimNumber();
    
    // Create the fee letter content
    const letterContent = createFeeLetterContent(claimNumber);
    
    // Define the path where the file will be saved
    const fileName = `fee_letter_${claimNumber}.txt`;
    const filePath = path.join(process.cwd(), 'output', fileName);
    
    // Make sure the directory exists
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save the file
    fs.writeFileSync(filePath, letterContent, 'utf8');
    
    console.log(`Fee letter successfully created: ${fileName}`);
    
    return claimNumber;
  } catch (error) {
    console.error('Error creating fee letter:', error);
    throw new Error('Could not create fee letter');
  }
}

/**
 * Generates a unique claim number
 * @returns {string} Generated claim number
 */
function generateClaimNumber(): string {
  // Format: SIN-YYYYMMDD-XXXX where XXXX are 4 random characters
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Generate 4 random characters using crypto.randomUUID()
  const randomPart = crypto.randomUUID().substring(0, 4).toUpperCase();
  
  return `SIN-${year}${month}${day}-${randomPart}`;
}

/**
 * Creates the fee letter content
 * @param {string} claimNumber - Claim number
 * @returns {string} Fee letter content
 */
function createFeeLetterContent(claimNumber: string): string {
  const currentDate = new Date().toLocaleDateString('es-ES');
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  const dueDateFormatted = dueDate.toLocaleDateString('es-ES');
  
  return `CARTA DE HONORARIOS PROFESIONALES
===================================

REFERENCIA: ${claimNumber}
FECHA DE EMISIÓN: ${currentDate}

DATOS DEL PROFESIONAL
-------------------
Nombre: Despacho Jurídico & Asociados
CIF/NIF: B-12345678
Dirección: Calle Principal 123, 28001 Madrid
Teléfono: 91 123 45 67
Email: contacto@despacho-juridico.es

DATOS DEL CLIENTE
---------------
Nombre: [Nombre del Cliente]
DNI/NIF: [DNI/NIF del Cliente]
Dirección: [Dirección del Cliente]
Teléfono: [Teléfono del Cliente]
Email: [Email del Cliente]

EXPEDIENTE RELACIONADO
-------------------
Número de Expediente: EXP-2023-${claimNumber.substring(12)}
Tipo de Caso: Reclamación de Seguro
Fecha de Apertura: ${currentDate}

DETALLE DE HONORARIOS
-------------------
Concepto                                  Importe
----------------------------------------  ----------
Estudio y análisis del caso               350,00 €
Redacción de documentos                   275,00 €
Representación legal                      500,00 €
Gestiones administrativas                 125,00 €
----------------------------------------  ----------
Subtotal                                 1250,00 €
IVA (21%)                                 262,50 €
----------------------------------------  ----------
TOTAL                                    1512,50 €

INFORMACIÓN DE PAGO
-----------------
Método de pago: Transferencia Bancaria
Entidad: Banco Ejemplo
IBAN: ES12 3456 7890 1234 5678 9012
Concepto: Honorarios ${claimNumber}
Fecha límite de pago: ${dueDateFormatted}

OBSERVACIONES
-----------
Los honorarios detallados corresponden a los servicios prestados en relación al expediente referenciado.
El impago de los honorarios en la fecha límite establecida podrá generar intereses de demora según lo establecido en la Ley 3/2004.

Este documento ha sido generado automáticamente y no requiere firma para su validez.
`;
} 