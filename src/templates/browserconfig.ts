/**
 * Browser Configuration Template Generator for Microsoft Browsers
 *
 * This module generates the browserconfig.xml file that Microsoft browsers use to
 * configure tile icons, colors, and behavior when a website is pinned to the
 * Windows Start menu or taskbar. This file is essential for proper integration
 * with the Windows platform.
 *
 * The browserconfig.xml file follows Microsoft's specification and includes
 * references to tile images in various sizes along with color configuration.
 *
 * @module templates/browserconfig
 */

/**
 * Interface for browser configuration options.
 * These options customize the generated browserconfig.xml file.
 *
 * @interface BrowserConfigOptions
 * @property {string} tileColor - The background color of the Windows tiles (hex format, e.g., "#ffffff")
 * @property {string} iconPath - The base path to the icon directory (e.g., "/icons")
 */
export interface BrowserConfigOptions {
  /** Tile color */
  tileColor: string;
  /** Path to the icons directory */
  iconPath: string;
}

/**
 * Generate a browserconfig.xml file content.
 * This function produces the XML content that references Microsoft tile icons
 * and defines their appearance when a site is pinned in Windows.
 *
 * @param {BrowserConfigOptions} options - Customization options for the browserconfig
 * @returns {string} - Complete browserconfig.xml content as a string
 *
 * @example
 * // Generate browserconfig.xml content with white tile background
 * const configXml = generateBrowserConfig({
 *   tileColor: '#ffffff',
 *   iconPath: '/icons'
 * });
 */
export function generateBrowserConfig(options: BrowserConfigOptions): string {
  const { tileColor, iconPath } = options;

  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square70x70logo src="${iconPath}/mstile-70x70.png"/>
            <square150x150logo src="${iconPath}/mstile-150x150.png"/>
            <square310x310logo src="${iconPath}/mstile-310x310.png"/>
            <wide310x150logo src="${iconPath}/mstile-310x150.png"/>
            <TileColor>${tileColor}</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;
}
