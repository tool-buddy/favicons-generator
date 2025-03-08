/**
 * Microsoft Tile Icons Generator Module
 *
 * This module handles the generation of Microsoft Tile Icons, which are used by
 * Microsoft browsers (IE11, Edge) and Windows operating systems when users pin
 * websites to their Start menu or taskbar. These tiles provide a branded visual
 * experience in the Windows ecosystem.
 *
 * The module creates both square tiles in multiple sizes and a wide (rectangular)
 * tile, following Microsoft's naming convention and size recommendations.
 *
 * @module generators/microsoft
 */
import path from 'path';
import { resizeImage, createMultipleSizes } from '../utils/image-utils.js';
import { MicrosoftTileResult } from '../types/index.js';
import { logFileCreated, logFileError, logGenerationStart } from '../utils/logger.js';
import { Color } from 'sharp';

/**
 * Microsoft Tile square sizes to generate.
 * These sizes correspond to various Windows tile sizes and devices:
 * - 70×70: Small tile
 * - 144×144: Used for IE11 pinned site
 * - 150×150: Medium tile
 * - 310×310: Large tile
 *
 * @type {Array<number>}
 */
const MS_TILE_SQUARE_SIZES: number[] = [70, 144, 150, 310];

/**
 * Microsoft Tile wide (rectangular) size.
 * The 310×150 tile is used for the wide tile format in Windows.
 *
 * @type {Object}
 * @property {number} width - The width of the wide tile (310px)
 * @property {number} height - The height of the wide tile (150px)
 */
const MS_TILE_WIDE_SIZE = { width: 310, height: 150 };

/**
 * Generate Microsoft Tile Icons from a source image.
 * This function creates both square tiles in multiple sizes and a wide (rectangular)
 * tile for Windows and Microsoft browsers.
 *
 * @param {string} sourceImage - Path to the source image to be processed
 * @param {string} outputDir - Directory where the tile icons will be saved
 * @param {Color} background - The background color to use when necessary (e.g., with when fitting a square image into a non square canvas)
 * @returns {Promise<Array<MicrosoftTileResult>>} - Promise resolving to an array of results for each tile
 *
 * @example
 * // Generate all Microsoft Tile Icons
 * const results = await generateMicrosoftTiles(
 *   'logo.png',
 *   'static/icons'
 * );
 */
export async function generateMicrosoftTiles(
  sourceImage: string,
  background: Color,
  outputDir: string
): Promise<MicrosoftTileResult[]> {
  logGenerationStart('Microsoft Tile Icons');

  const results: MicrosoftTileResult[] = [];

  // Generate square tiles in multiple sizes (70x70, 144x144, 150x150, 310x310)
  const squareResults = await createMultipleSizes(
    sourceImage,
    MS_TILE_SQUARE_SIZES,
    background,
    path.join(outputDir, 'mstile-{size}x{size}.png')
  );

  // Log results from square tiles generation
  squareResults.forEach(result => {
    if (result.success) {
      logFileCreated(result.path);
    } else {
      logFileError(result.path, result.error);
    }
  });

  results.push(...(squareResults as MicrosoftTileResult[]));

  // Generate the wide rectangular tile (310x150)
  // This tile is used for the wide tile format in Windows Start menu
  const wideOutputPath = path.join(
    outputDir,
    `mstile-${MS_TILE_WIDE_SIZE.width}x${MS_TILE_WIDE_SIZE.height}.png`
  );

  try {
    await resizeImage(
      sourceImage,
      MS_TILE_WIDE_SIZE.width,
      MS_TILE_WIDE_SIZE.height,
      background,
      wideOutputPath
    );

    logFileCreated(wideOutputPath);
    results.push({
      size: `${MS_TILE_WIDE_SIZE.width}x${MS_TILE_WIDE_SIZE.height}`,
      path: wideOutputPath,
      success: true,
      isWide: true,
    });
  } catch (error) {
    logFileError(wideOutputPath, error);
    results.push({
      size: `${MS_TILE_WIDE_SIZE.width}x${MS_TILE_WIDE_SIZE.height}`,
      path: wideOutputPath,
      success: false,
      error: error as Error,
      isWide: true,
    });
  }

  return results;
}
