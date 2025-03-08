/**
 * Favicons Generator Main Module
 *
 * This module serves as the primary entry point for the favicons-generator library.
 * It orchestrates the entire icon generation process, coordinating between various
 * specialized generators to create a complete set of web icons, favicons, and
 * associated configuration files from a single source image.
 *
 * The generation process includes:
 * 1. Standard favicons for desktop browsers (PNG and ICO)
 * 2. Apple Touch Icons for iOS devices
 * 3. Android icons for Chrome and PWAs
 * 4. Microsoft Tile icons for Windows
 * 5. Configuration files (webmanifest, browserconfig)
 * 6. HTML integration guide
 *
 * @module index
 */
import path from 'path';

// Import utilities
import { ensureDirectoryExists, writeContentToFile, writeJsonToFile } from './utils/file-system.js';
import { setVerboseMode } from './utils/logger.js';

// Import specialized icon generators
import { generateFaviconPngs, generateFaviconIco } from './generators/favicon.js';
import { generateAppleTouchIcons } from './generators/apple.js';
import { generateAndroidIcons } from './generators/android.js';
import { generateMicrosoftTiles } from './generators/microsoft.js';

// Import template generators for configuration files
import { generateWebManifest, WebManifestOptions } from './templates/manifest.js';
import { generateBrowserConfig, BrowserConfigOptions } from './templates/browserconfig.js';
import { generateHtmlHead, HtmlHeadOptions } from './templates/html-head.js';

// Import types from central types module
import { ImageOperationResult, GenerationResults, GenerationConfig } from './types/index.js';

/**
 * Generate a complete set of web icons and configuration files from a single source image.
 * This is the main function exposed by the library and serves as the entry point for all
 * icon generation operations.
 *
 * The function handles:
 * - Creating all required directories
 * - Generating various icon types (favicon, Apple, Android, Microsoft)
 * - Creating configuration files (webmanifest, browserconfig.xml)
 * - Producing HTML integration instructions
 *
 * @param {GenerationConfig} config - User-provided configuration containing source image path,
 *                             application name, and output directory
 * @returns {Promise<GenerationResults>} - Comprehensive results object detailing the outcome
 *                                        of each generation operation
 *
 * @example
 * // With verbose logging
 * const results = await generateIcons({
 *   sourceImage: 'path/to/logo.png',
 *   name: 'My Application',
 *   outputDir: 'static',
 *   verbose: true
 * });
 *
 * @throws Will throw an error if critical operations fail, such as the source image not being found
 */
export async function generateIcons(config: GenerationConfig): Promise<GenerationResults> {
  setVerboseMode(config.verbose);

  const backgroundColor = '#ffffff00';
  const iconsDir = 'icons';
  const iconPath = `/${iconsDir}`;

  // Create output directories
  const outputDir = config.outputDir;
  ensureDirectoryExists(outputDir);
  const iconsOutputDir = path.join(outputDir, iconsDir);
  ensureDirectoryExists(iconsOutputDir);

  const results: GenerationResults = {
    favicons: { png: [], ico: null },
    apple: [],
    android: [],
    microsoft: [],
    webmanifest: null,
    browserconfig: null,
    htmlInstructions: null,
  };

  try {
    // Step 1: Generate standard favicon PNGs in multiple sizes (16x16, 32x32, 48x48, 96x96)
    results.favicons.png = await generateFaviconPngs(
      config.sourceImage,
      backgroundColor,
      iconsOutputDir
    );

    // Step 2: Generate favicon.ico from the 32x32 PNG
    // Note: The ICO file is placed in the root output directory, not in the icons subdirectory
    const favicon32 = results.favicons.png.find(
      (item: ImageOperationResult) => item.size === 32 && item.success
    );
    if (favicon32) {
      results.favicons.ico = await generateFaviconIco(
        favicon32.path,
        path.join(outputDir, 'favicon.ico')
      );
    } else {
      console.warn('Warning: No 32x32 favicon PNG found for ICO generation');
    }

    // Step 3: Generate Apple Touch Icons for iOS devices
    // These icons are used when users add the site to their home screen
    results.apple = await generateAppleTouchIcons(
      config.sourceImage,
      backgroundColor,
      iconsOutputDir
    );

    // Step 4: Generate Android Icons for Chrome and PWA support
    // These icons appear when the site is added to the home screen on Android
    results.android = await generateAndroidIcons(
      config.sourceImage,
      backgroundColor,
      iconsOutputDir
    );

    // Step 5: Generate Microsoft Tile Icons for Windows
    // These icons appear in Windows when the site is pinned to start
    results.microsoft = await generateMicrosoftTiles(
      config.sourceImage,
      backgroundColor,
      iconsOutputDir
    );

    // Step 6: Create site.webmanifest file for PWA support
    // This file provides metadata for Progressive Web Apps
    const manifestOptions: WebManifestOptions = {
      name: config.name,
      shortName: config.name,
      themeColor: backgroundColor,
      backgroundColor: backgroundColor,
      display: 'standalone',
      iconPath: iconPath,
    };

    const manifestContent = generateWebManifest(manifestOptions);
    writeJsonToFile(
      path.join(outputDir, 'site.webmanifest'),
      manifestContent as unknown as Record<string, unknown>
    );
    results.webmanifest = { path: path.join(outputDir, 'site.webmanifest'), success: true };

    // Step 7: Create browserconfig.xml for Microsoft browser integration
    // This file configures tile icons and colors for Internet Explorer and Edge
    const browserConfigOptions: BrowserConfigOptions = {
      tileColor: backgroundColor,
      iconPath: iconPath,
    };

    const browserConfigContent = generateBrowserConfig(browserConfigOptions);
    writeContentToFile(path.join(outputDir, 'browserconfig.xml'), browserConfigContent);
    results.browserconfig = { path: path.join(outputDir, 'browserconfig.xml'), success: true };

    // Step 8: Create HTML head instructions file
    // This provides developers with the HTML tags needed to integrate the icons
    const htmlHeadOptions: HtmlHeadOptions = {
      themeColor: backgroundColor,
      tileColor: backgroundColor,
      iconPath: iconPath,
      includeAppleSizes: true,
    };

    const htmlInstructionsContent = generateHtmlHead(htmlHeadOptions);

    writeContentToFile(path.join(outputDir, 'head-instructions.html'), htmlInstructionsContent);
    results.htmlInstructions = {
      path: path.join(outputDir, 'head-instructions.html'),
      success: true,
    };

    return results;
  } catch (error) {
    console.error('Error generating icons:', error);
    throw error;
  }
}
