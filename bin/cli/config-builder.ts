/**
 * CLI config builder module
 */
import { GenerationConfig } from '../../src/types/app.js';
import { ParsedArgs } from './args-parser.js';

/**
 * Error interface for configuration validation
 */
export interface ValidationError {
  field: string;
  message: string;
}

export const DEFAULT_OUTPUT_DIR = 'static';

/**
 * Build configuration from parsed CLI arguments
 * @param {ParsedArgs} args - Parsed CLI arguments
 * @returns {GenerationConfig} Generator configuration
 */
export function buildConfig(args: ParsedArgs): GenerationConfig {
  // Create configuration by merging CLI args with defaults
  return {
    sourceImage: args.sourceImage,
    name: args.appName,
    outputDir: args.outputFolder || DEFAULT_OUTPUT_DIR,
    verbose: args.verbose,
  };
}
