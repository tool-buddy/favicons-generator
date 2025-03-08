#!/usr/bin/env node
/**
 * Command-line interface for the Favicons Generator.
 *
 * This is the main entry point for the favicons-generator CLI. It handles:
 * 1. Parsing and validating command-line arguments
 * 2. Building a configuration object from those arguments
 * 3. Running the icon generation process
 * 4. Displaying appropriate messages to the user
 *
 * Usage:
 *   node generate-favicons.js <source-image> <app-name> [output-dir]
 *   npm start -- <source-image> <app-name> [output-dir]
 *
 * @module bin/generate-favicons
 */
import { generateIcons } from '../src/index.js';
import { setVerboseMode } from './cli/cli-ui.js';
import {
  parseArgs,
  buildConfig,
  displayWelcomeMessage,
  displayHelpMessage,
  validateArgs,
  displaySuccessMessage,
  displayErrorMessage,
  ParsedArgs,
} from './cli/index.js';

const args: ParsedArgs = parseArgs();
if (args.showHelp) {
  displayHelpMessage();
  process.exit(0);
}

const error = validateArgs(args);
if (error) {
  console.error(`Error: ${error}`);
  displayHelpMessage();
  process.exit(1);
}

const config = buildConfig(args);
setVerboseMode(config.verbose);
// Run the generator
(async (): Promise<void> => {
  try {
    displayWelcomeMessage();
    await generateIcons(config);
    displaySuccessMessage(config.outputDir);
  } catch (error) {
    displayErrorMessage(error);
    process.exit(1);
  }
})();
