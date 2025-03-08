/**
 * Common interfaces and types used across the application.
 * This module contains shared type definitions that are used by multiple components
 * of the favicons generator.
 *
 * @module types/common
 */

/**
 * Result of an image operation.
 * This interface represents the result of any image processing operation,
 * such as resizing or format conversion.
 *
 * @interface ImageOperationResult
 * @property {number|string} [size] - The size of the generated image (can be a single number for square images or a string like "310x150" for non-square)
 * @property {string} path - The file path where the image was saved
 * @property {boolean} success - Whether the operation was successful
 * @property {Error} [error] - Error object if the operation failed
 */
export interface ImageOperationResult {
  size?: number | string;
  path: string;
  success: boolean;
  error?: Error;
}
