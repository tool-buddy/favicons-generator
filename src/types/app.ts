/**
 * Application-specific type definitions.
 * This module contains type definitions related to the application configuration,
 * results tracking, and file operations.
 *
 * @module types/app
 */
import { ImageOperationResult } from './common.js';
import { AppleIconResult, AndroidIconResult, MicrosoftTileResult } from './generators.js';

/**
 * Interface for file operation result.
 * Represents the outcome of a file operation such as writing a config file
 * or creating a text file.
 *
 * @interface FileOperationResult
 * @property {string} path - The file path where the operation was performed
 * @property {boolean} success - Whether the operation was successful
 * @property {Error} [error] - Error object if the operation failed
 */
export interface FileOperationResult {
  path: string;
  success: boolean;
  error?: Error;
}

/**
 * Interface for the generator configuration.
 * Contains the essential parameters needed to generate favicons and icons.
 *
 * @interface GenerationConfig
 * @property {string} sourceImage - Path to the source image that will be processed
 * @property {string} name - Name of the application (used in manifests and configs)
 * @property {string} outputDir - Output directory for generated files
 *                                (default is 'static' if not specified)
 * @property {boolean} verbose - Whether to enable verbose logging mode
 */
export interface GenerationConfig {
  /** Source image path */
  sourceImage: string;
  /** Name of the application */
  name: string;
  /** Output directory for generated files */
  outputDir: string;
  /** Whether to enable verbose logging */
  verbose: boolean;
}

/**
 * Interface for generation results.
 * Tracks the results of all icon generation operations. This comprehensive
 * object contains results for each category of generated assets.
 *
 * @interface GenerationResults
 * @property {object} favicons - Results for favicon generation
 * @property {ImageOperationResult[]} favicons.png - Results for PNG favicon generation
 * @property {FileOperationResult | null} favicons.ico - Result for ICO favicon generation
 * @property {AppleIconResult[]} apple - Results for Apple Touch Icon generation
 * @property {AndroidIconResult[]} android - Results for Android icon generation
 * @property {MicrosoftTileResult[]} microsoft - Results for Microsoft Tile generation
 * @property {FileOperationResult | null} webmanifest - Result for site.webmanifest creation
 * @property {FileOperationResult | null} browserconfig - Result for browserconfig.xml creation
 * @property {FileOperationResult | null} htmlInstructions - Result for HTML instructions file creation
 */
export interface GenerationResults {
  favicons: {
    png: ImageOperationResult[];
    ico: FileOperationResult | null;
  };
  apple: AppleIconResult[];
  android: AndroidIconResult[];
  microsoft: MicrosoftTileResult[];
  webmanifest: FileOperationResult | null;
  browserconfig: FileOperationResult | null;
  htmlInstructions: FileOperationResult | null;
}
