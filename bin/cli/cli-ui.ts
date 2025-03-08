/**
 * CLI user interface module
 */
import { ValidationError } from './config-builder.js';
import { DEFAULT_OUTPUT_DIR } from './config-builder.js';

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

export const SCRIPT_NAME = 'generate-favicons.js';
/**
 * Display welcome message for the CLI
 */
export function displayWelcomeMessage(): void {
  if (verboseMode) {
    console.log('===================================');
    console.log('       Favicons Generator         ');
    console.log('===================================');
    console.log('Generating all standard web favicons from a single source image.\n');
  }
}

/**
 * Display help message for the CLI
 */
export function displayHelpMessage(): void {
  console.log(`\nUsage: node ${SCRIPT_NAME} <source-image.png> <app-name> [output-folder]`);
  console.log('\nRequired arguments:');
  console.log('  <source-image.png>       Path to the source image file');
  console.log('  <app-name>               Name of your application');
  console.log('\nOptional arguments:');
  console.log(
    `  [output-folder]          Output directory for generated files (default: "${DEFAULT_OUTPUT_DIR}")`
  );
  console.log('\nOptions:');
  console.log('  --help, -h               Show this help message');
  console.log('  --verbose, -v            Enable verbose logging (show all output)');
  console.log('\nExample:');
  console.log(`  node ${SCRIPT_NAME} logo.png "My Awesome App" custom-output`);
}

/**
 * Display error message for missing arguments
 */
export function displayMissingArgsError(): void {
  console.error('Error: Missing required arguments.');
  displayHelpMessage();
}

/**
 * Display error message for source image not found
 * @param {string} sourceImagePath - The path that was not found
 */
export function displayMissingImageError(sourceImagePath: string): void {
  console.error(`Error: Source image "${sourceImagePath}" not found.`);
  console.log('\nMake sure the source image file exists and the path is correct.');
  displayHelpMessage();
}

/**
 * Display validation errors
 * @param {ValidationError[]} errors - List of validation errors
 */
export function displayValidationErrors(errors: ValidationError[]): void {
  console.error('\n❌ Configuration validation failed:');

  errors.forEach(error => {
    console.error(`  - ${error.message}`);
  });

  console.log('');
  displayHelpMessage();
}

/**
 * Display successful completion message
 */
export function displaySuccessMessage(outputDir: string): void {
  if (verboseMode) {
    console.log('\n✅ All done! Your icons are ready to use.');
    console.log(`Check the ${outputDir} directory for all the generated files.`);
  }
}

/**
 * Display error message
 * @param {unknown} error - The error that occurred
 */
export function displayErrorMessage(error: unknown): void {
  console.error('\n❌ Error generating icons:', error);
}
