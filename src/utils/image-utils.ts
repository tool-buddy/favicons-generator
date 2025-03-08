/**
 * Image processing utility functions.
 * This module provides core image processing capabilities for the favicons generator,
 * including resizing, format conversion, and batch processing utilities.
 *
 * @module utils/image-utils
 */
import sharp from 'sharp';
import { Color } from 'sharp';
import path from 'path';
import fs from 'fs';
import pngToIco from 'png-to-ico';
import { ensureDirectoryExists } from './file-system.js';
import { ImageOperationResult } from '../types/common.js';

/**
 * Resize an image to a specific size.
 * This is the core image processing function that leverages the Sharp library
 * to perform high-quality image resizing operations.
 *
 * @param {string} inputPath - Path to the input image
 * @param {number} width - Target width in pixels
 * @param {number} height - Target height in pixels
 * @param {string} outputPath - Path where the resized image will be saved
 * @returns {Promise<sharp.OutputInfo>} - Promise resolving to the Sharp info object with metadata about the output image
 * @throws Will throw an error if the image processing fails
 *
 * @example
 * // Resize an image to 48x48 pixels
 * await resizeImage('logo.png', 48, 48, 'favicon-48x48.png');
 */
export async function resizeImage(
  inputPath: string,
  width: number,
  height: number,
  background: Color,
  outputPath: string
): Promise<sharp.OutputInfo> {
  ensureDirectoryExists(path.dirname(outputPath));
  return sharp(inputPath)
    .resize(width, height, { fit: 'contain', background: background })
    .toFile(outputPath);
}

/**
 * Create a favicon.ico file from a PNG file.
 * This function converts a PNG image to the ICO format required for favicon.ico files.
 *
 * @param {string} inputPath - Path to the input PNG image
 * @param {string} outputPath - Path where the ICO file will be saved
 * @returns {Promise<boolean>} - Promise resolving to true if successful, false if failed
 *
 * @example
 * // Create favicon.ico from a 32x32 PNG
 * const success = await createFaviconIco('favicon-32x32.png', 'favicon.ico');
 * if (success) {
 *   console.log('Favicon created successfully');
 * }
 */
export async function createFaviconIco(inputPath: string, outputPath: string): Promise<boolean> {
  try {
    ensureDirectoryExists(path.dirname(outputPath));
    const icoBuffer = await pngToIco([inputPath]);
    fs.writeFileSync(outputPath, icoBuffer);
    return true;
  } catch (error) {
    console.error('Error creating favicon.ico:', error);
    return false;
  }
}

/**
 * Creates multiple sizes of an image in a batch operation.
 * This utility function creates multiple resized versions of an image in a single batch,
 * using the same options for all resizing operations.
 *
 * @param {string} inputPath - Path to the input image
 * @param {Array<number>} sizes - Array of sizes in pixels (for square images, width = height = size)
 * @param {string} outputPathPattern - Output path pattern with {size} placeholder
 *                                    (e.g., 'icons/favicon-{size}x{size}.png')
 * @returns {Promise<Array<ImageOperationResult>>} - Promise resolving to array of results for each size
 *
 * @example
 * // Create multiple favicon sizes
 * const sizes = [16, 32, 48, 96];
 * const results = await createMultipleSizes(
 *   'logo.png',
 *   sizes,
 *   'icons/favicon-{size}x{size}.png'
 * );
 */
export async function createMultipleSizes(
  inputPath: string,
  sizes: number[],
  background: Color,
  outputPathPattern: string
): Promise<ImageOperationResult[]> {
  const resizePromises = sizes.map(size => {
    const outputPath = outputPathPattern.replaceAll('{size}', size.toString());
    return resizeImage(inputPath, size, size, background, outputPath)
      .then(() => ({ size, path: outputPath, success: true }))
      .catch(error => ({ size, path: outputPath, success: false, error }));
  });

  return Promise.all(resizePromises);
}
