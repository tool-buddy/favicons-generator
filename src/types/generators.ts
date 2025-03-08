/**
 * Generator-specific interfaces and types.
 * This module contains type definitions specific to the various icon generators,
 * each extending the base ImageOperationResult interface with properties
 * relevant to that icon type.
 *
 * @module types/generators
 */
import { ImageOperationResult } from './common.js';

/**
 * Interface for Apple Touch Icon operation result.
 * Extends the base ImageOperationResult with Apple-specific properties.
 *
 * @interface AppleIconResult
 * @extends ImageOperationResult
 * @property {boolean} [isDefault] - Indicates if this is the default Apple Touch Icon
 *                                   (the one referenced without a size in HTML)
 */
export interface AppleIconResult extends ImageOperationResult {
  isDefault?: boolean;
}

/**
 * Interface for Favicon operation result.
 * Currently identical to the base ImageOperationResult, but defined separately
 * for type clarity and potential future expansion.
 *
 * @interface FaviconResult
 * @extends ImageOperationResult
 */
export interface FaviconResult extends ImageOperationResult {}

/**
 * Interface for Android Icon operation result.
 * Currently identical to the base ImageOperationResult, but defined separately
 * for type clarity and potential future expansion with Android-specific properties.
 *
 * @interface AndroidIconResult
 * @extends ImageOperationResult
 */
export interface AndroidIconResult extends ImageOperationResult {}

/**
 * Interface for Microsoft Tile Icon operation result.
 * Extends the base ImageOperationResult with Microsoft-specific properties.
 *
 * @interface MicrosoftTileResult
 * @extends ImageOperationResult
 * @property {boolean} [isWide] - Indicates if this is a wide tile (rectangular rather than square)
 */
export interface MicrosoftTileResult extends ImageOperationResult {
  isWide?: boolean;
}
