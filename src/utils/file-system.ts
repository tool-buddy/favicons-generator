/**
 * File system utility functions
 */
import fs from 'fs';
import path from 'path';

/**
 * Creates a directory if it doesn't exist
 * @param {string} dirPath - Path to the directory
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Writes content to a file, ensuring the directory exists
 * @param {string} filePath - Path to the file
 * @param {string} content - Content to write
 */
export function writeContentToFile(filePath: string, content: string): void {
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

/**
 * Writes JSON content to a file, ensuring the directory exists
 * @param {string} filePath - Path to the file
 * @param {Object} jsonContent - JSON content to write
 * @param {number} indent - Number of spaces to use for indentation
 */
export function writeJsonToFile(
  filePath: string,
  jsonContent: Record<string, unknown>,
  indent = 2
): void {
  writeContentToFile(filePath, JSON.stringify(jsonContent, null, indent));
}
