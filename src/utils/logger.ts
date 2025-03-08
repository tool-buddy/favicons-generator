/**
 * Logging utility functions
 */

/**
 * Logger configuration - defaults to verbose mode
 */
let verboseMode: boolean = true;

/**
 * Set the logger's verbose mode
 * @param enabled - Whether verbose logging is enabled
 */
export function setVerboseMode(enabled: boolean): void {
  verboseMode = enabled;
}

/**
 * Log a success message for a created file
 * @param path - Path of the successfully created file
 */
export function logFileCreated(path: string): void {
  if (verboseMode) {
    console.log(`Created ${path}`);
  }
}

/**
 * Log an error message for a file creation failure
 * @param path - Path of the file that failed to create
 * @param error - Optional error object
 */
export function logFileError(path: string, error?: unknown): void {
  // Error logs are always shown regardless of verbose mode
  if (error) {
    console.error(`Error creating ${path}:`, error);
  } else {
    console.error(`Error creating ${path}`);
  }
}

/**
 * Log the start of a generation process
 * @param process - Name of the process being started
 */
export function logGenerationStart(process: string): void {
  if (verboseMode) {
    console.log(`Generating ${process}...`);
  }
}
