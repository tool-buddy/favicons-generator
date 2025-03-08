/**
 * Favicon Generator Module
 *
 * This module handles the generation of standard favicon files, including
 * multiple sizes of PNG favicons and the traditional favicon.ico file.
 * These icons are essential for desktop browsers and serve as the primary
 * visual identifier for websites in browser tabs, bookmarks, and history.
 *
 * @module generators/favicon
 */
import path from 'path';
import { resizeImage, createFaviconIco } from '../utils/image-utils.js';
import { FaviconResult } from '../types/index.js';
import { logFileCreated, logFileError, logGenerationStart } from '../utils/logger.js';
import { Color } from 'sharp';

/**
 * Standard favicon sizes to generate.
 * These sizes cover the most common requirements for modern browsers:
 * - 16x16: Classic favicon size, used in browser tabs and favorites
 * - 32x32: Higher resolution for modern browsers and Windows taskbar
 * - 48x48: Used by some browsers and operating systems
 * - 96x96: High-resolution favicon for modern displays
 *
 * @type {Array<number>}
 */
const FAVICON_SIZES: number[] = [16, 32, 48, 96];

/**
 * Generate multiple favicon PNG files from a source image.
 * This function creates a set of PNG favicon files in standard sizes.
 *
 * @param {string} sourceImage - Path to the source image to be processed
 * @param {string} outputDir - Directory where the favicons will be saved
 * @param {Color} background - The background color to use when necessary (e.g., with when fitting a square image into a non square canvas)
 * @returns {Promise<Array<FaviconResult>>} - Promise resolving to an array of results for each size
 *
 * @example
 * // Generate all standard favicon PNG files
 * const results = await generateFaviconPngs(
 *   'logo.png',
 *   'static/icons'
 * );
 */
export async function generateFaviconPngs(
  sourceImage: string,
  background: Color,
  outputDir: string
): Promise<FaviconResult[]> {
  logGenerationStart('favicon PNG files');

  const results: FaviconResult[] = [];

  for (const size of FAVICON_SIZES) {
    const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
    try {
      await resizeImage(sourceImage, size, size, background, outputPath);
      logFileCreated(outputPath);
      results.push({ size, path: outputPath, success: true });
    } catch (error) {
      logFileError(outputPath, error);
      results.push({ size, path: outputPath, success: false, error: error as Error });
    }
  }

  return results;
}

/**
 * Generate the traditional favicon.ico file from a PNG image.
 * The favicon.ico file remains important for backward compatibility with older
 * browsers and systems that don't support PNG favicons.
 *
 * Note: This function currently uses just the 32x32 size for the ICO file.
 * Future versions may support multi-size ICO generation.
 *
 * @param {string} pngPath - Path to the source PNG (usually the 32x32 favicon)
 * @param {string} outputPath - Path where the .ico file will be saved
 * @returns {Promise<FaviconResult>} - Promise resolving to the operation result
 *
 * @example
 * // Generate favicon.ico from a 32x32 PNG
 * const result = await generateFaviconIco(
 *   'static/icons/favicon-32x32.png',
 *   'static/favicon.ico'
 * );
 */
export async function generateFaviconIco(
  pngPath: string,
  outputPath: string
): Promise<FaviconResult> {
  logGenerationStart('favicon.ico');

  try {
    const success = await createFaviconIco(pngPath, outputPath);

    if (success) {
      logFileCreated(outputPath);
      return { path: outputPath, success: true };
    } else {
      logFileError(outputPath);
      return { path: outputPath, success: false };
    }
  } catch (error) {
    logFileError(outputPath, error);
    return { path: outputPath, success: false, error: error as Error };
  }
}
