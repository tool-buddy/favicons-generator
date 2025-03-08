/**
 * Apple Touch Icons Generator Module
 *
 * This module handles the generation of Apple Touch Icons, which are used by iOS devices
 * when users add a website to their home screen. These icons provide a high-quality visual
 * representation of the website on Apple devices.
 *
 * Apple Touch Icons follow specific naming conventions and come in multiple sizes to
 * support different Apple devices including iPhones, iPads, and iPod Touch devices.
 *
 * @module generators/apple
 */
import path from 'path';
import { resizeImage, createMultipleSizes } from '../utils/image-utils.js';
import { AppleIconResult } from '../types/index.js';
import { logFileCreated, logFileError, logGenerationStart } from '../utils/logger.js';
import { Color } from 'sharp';

/**
 * Apple Touch Icon sizes to generate.
 * These sizes correspond to the various Apple devices:
 * - 57×57: iPhone non-Retina, iPod Touch non-Retina
 * - 60×60: iPhone iOS 7-8
 * - 72×72: iPad non-Retina
 * - 76×76: iPad non-Retina iOS 7-8
 * - 114×114: iPhone Retina
 * - 120×120: iPhone Retina iOS 7-8
 * - 144×144: iPad Retina
 * - 152×152: iPad Retina iOS 7-8
 * - 180×180: iPhone 6 Plus
 *
 * @type {Array<number>}
 */
const APPLE_ICON_SIZES: number[] = [57, 60, 72, 76, 114, 120, 144, 152, 180];

/**
 * Default Apple Touch Icon size.
 * When a specific size isn't requested, iOS will use this default size.
 * 180×180 is the largest and best quality, suitable for the latest devices.
 *
 * @type {number}
 */
const DEFAULT_APPLE_ICON_SIZE = 180;

/**
 * Generate all Apple Touch Icons from a source image.
 * This function creates both the default apple-touch-icon.png and size-specific
 * apple-touch-icon-{size}x{size}.png files.
 *
 * @param {string} sourceImage - Path to the source image to be processed
 * @param {string} outputDir - Directory where the icons will be saved
 * @param {Color} background - The background color to use when necessary (e.g., with when fitting a square image into a non square canvas)
 * @returns {Promise<Array<AppleIconResult>>} - Promise resolving to an array of results for each size
 *
 * @example
 * // Generate all Apple Touch Icons
 * const results = await generateAppleTouchIcons(
 *   'logo.png',
 *   'static/icons'
 * );
 */
export async function generateAppleTouchIcons(
  sourceImage: string,
  background: Color,
  outputDir: string
): Promise<AppleIconResult[]> {
  logGenerationStart('Apple Touch Icons');

  const results: AppleIconResult[] = [];

  // Generate the default apple-touch-icon.png (180x180)
  // This is the icon used when no specific size is requested in the HTML
  const defaultOutputPath = path.join(outputDir, 'apple-touch-icon.png');
  try {
    await resizeImage(
      sourceImage,
      DEFAULT_APPLE_ICON_SIZE,
      DEFAULT_APPLE_ICON_SIZE,
      background,
      defaultOutputPath
    );
    logFileCreated(defaultOutputPath);
    results.push({
      size: DEFAULT_APPLE_ICON_SIZE,
      path: defaultOutputPath,
      success: true,
      isDefault: true,
    });
  } catch (error) {
    logFileError(defaultOutputPath, error);
    results.push({
      size: DEFAULT_APPLE_ICON_SIZE,
      path: defaultOutputPath,
      success: false,
      error: error as Error,
      isDefault: true,
    });
  }

  // Generate size-specific apple touch icons for various Apple devices
  // These icons follow the naming convention apple-touch-icon-{size}x{size}.png
  const sizedResults = await createMultipleSizes(
    sourceImage,
    APPLE_ICON_SIZES,
    background,
    path.join(outputDir, 'apple-touch-icon-{size}x{size}.png')
  );

  sizedResults.forEach(result => {
    if (result.success) {
      logFileCreated(result.path);
    } else {
      logFileError(result.path, result.error);
    }
  });

  return [...results, ...(sizedResults as AppleIconResult[])];
}
