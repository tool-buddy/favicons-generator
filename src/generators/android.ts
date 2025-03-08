/**
 * Android Chrome Icons Generator Module
 *
 * This module handles the generation of Android Chrome icons, which are used by
 * Android devices when a website is added to the home screen. These icons are also
 * essential for Progressive Web Applications (PWAs) on Android.
 *
 * The icons follow the naming convention android-chrome-{size}x{size}.png and
 * are referenced in the site.webmanifest file for proper integration.
 *
 * @module generators/android
 */
import path from 'path';
import { createMultipleSizes } from '../utils/image-utils.js';
import { AndroidIconResult } from '../types/index.js';
import { logFileCreated, logFileError, logGenerationStart } from '../utils/logger.js';
import { Color } from 'sharp';

/**
 * Android Chrome Icon sizes to generate.
 * These sizes are recommended by Google for Android Chrome and PWAs:
 * - 192×192: Used for the home screen icon on most Android devices
 * - 512×512: Used for the splash screen and Play Store listings for PWAs
 *
 * @type {Array<number>}
 */
const ANDROID_ICON_SIZES: number[] = [192, 512];

/**
 * Generate Android Chrome Icons from a source image.
 * This function creates Android Chrome icons in the standard sizes required for
 * Android devices and Progressive Web Applications.
 *
 * @param {string} sourceImage - Path to the source image to be processed
 * @param {string} outputDir - Directory where the icons will be saved
 * @param {Color} background - The background color to use when necessary (e.g., with when fitting a square image into a non square canvas)
 * @returns {Promise<Array<AndroidIconResult>>} - Promise resolving to an array of results for each size
 *
 * @example
 * // Generate all Android Chrome Icons
 * const results = await generateAndroidIcons(
 *   'logo.png',
 *   'static/icons'
 * );
 */
export async function generateAndroidIcons(
  sourceImage: string,
  background: Color,
  outputDir: string
): Promise<AndroidIconResult[]> {
  logGenerationStart('Android Chrome Icons');

  const results = await createMultipleSizes(
    sourceImage,
    ANDROID_ICON_SIZES,
    background,
    path.join(outputDir, 'android-chrome-{size}x{size}.png')
  );

  results.forEach(result => {
    if (result.success) {
      logFileCreated(result.path);
    } else {
      logFileError(result.path, result.error);
    }
  });

  return results;
}
