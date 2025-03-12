import path from "path";
import fs from "fs";

/**
 * Reads the specified record files
 * @param fileName1 Name of the first record file
 * @param fileName2 Name of the second record file
 * @returns Object with the content of the records and the operation status
 */
export function readFiles(fileName1: string, fileName2: string) {
  let success = true;
  const file1 = path.join(process.cwd(), fileName1);
  const file2 = path.join(process.cwd(), fileName2);

  if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
    return { record1: null, record2: null, success: false };
  }

  const record1 = fs.readFileSync(file1, 'utf-8');
  const record2 = fs.readFileSync(file2, 'utf-8');

  return { record1, record2, success };
}

/**
 * Updates the status of a record from "pending" to "submitted"
 * @param fileName Name of the file to update
 * @param content Current content of the file
 */
export function updateFiles(fileName: string, content: string) {
  const updatedRecord = content.replace('Estado: pendiente', 'Estado: ingresado');
  fs.writeFileSync(path.join(process.cwd(), fileName), updatedRecord, 'utf8');
} 