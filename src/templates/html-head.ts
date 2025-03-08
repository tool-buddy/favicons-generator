/**
 * HTML Head Template Generator for Favicon and Icon Tags
 *
 * This module generates HTML tags that should be added to the <head> section of
 * a website to properly reference and integrate all the generated favicons and
 * icons. These tags ensure proper display across different browsers, devices, and
 * platforms.
 *
 * The generated HTML includes tags for:
 * - Standard favicons for desktop browsers
 * - Apple Touch Icons for iOS devices
 * - Web App Manifest reference for PWAs
 * - Microsoft Tile configuration for Windows
 * - Theme color metadata
 *
 * @module templates/html-head
 */

/**
 * Interface for HTML head template options.
 * These options customize the generated HTML head tags.
 *
 * @interface HtmlHeadOptions
 * @property {string} themeColor - Primary theme color of the application (hex format, e.g., "#ffffff")
 * @property {string} tileColor - Background color for Microsoft tiles (hex format, e.g., "#ffffff")
 * @property {string} iconPath - Base path to the icon directory (e.g., "/icons")
 * @property {boolean} includeAppleSizes - Whether to include individual size references for Apple Touch Icons
 */
export interface HtmlHeadOptions {
  /** Theme color */
  themeColor: string;
  /** MS Tile color */
  tileColor: string;
  /** Path to the icons directory */
  iconPath: string;
  /** Include all Apple Touch icon sizes */
  includeAppleSizes: boolean;
}

/**
 * Generate HTML head tags for all generated icons.
 * This function produces a complete set of HTML <link> and <meta> tags that
 * reference all the favicon and icon assets, making them available to browsers
 * and devices.
 *
 * @param {HtmlHeadOptions} options - Customization options for the HTML tags
 * @returns {string} - Complete HTML head tag content as a string
 *
 * @example
 * // Generate HTML head tags with white theme and tile colors
 * const htmlTags = generateHtmlHead({
 *   themeColor: '#ffffff',
 *   tileColor: '#ffffff',
 *   iconPath: '/icons',
 *   includeAppleSizes: true
 * });
 *
 * // The result can be included directly in your HTML head section:
 * // <!DOCTYPE html>
 * // <html>
 * // <head>
 * //   <!-- other head content -->
 * //   [paste generated HTML here]
 * //   <!-- other head content -->
 * // </head>
 * // ...
 */
export function generateHtmlHead(options: HtmlHeadOptions): string {
  const { themeColor, tileColor, iconPath, includeAppleSizes } = options;

  // Standard favicon tags for desktop browsers
  let html = `<!-- favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="${iconPath}/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="${iconPath}/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="96x96" href="${iconPath}/favicon-96x96.png">

`;

  // Apple Touch Icons for iOS devices
  html += `<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="${iconPath}/apple-touch-icon.png">
`;

  // Add individual Apple Touch Icon sizes if requested
  // This provides more specific size matches for different Apple devices
  if (includeAppleSizes) {
    const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];
    appleSizes.forEach(size => {
      html += `<link rel="apple-touch-icon" sizes="${size}x${size}" href="${iconPath}/apple-touch-icon-${size}x${size}.png">\n`;
    });
    html += '\n';
  }

  // Web App Manifest for Progressive Web Applications
  html += `<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">

`;

  // Microsoft Tile configuration for Windows Start menu and taskbar
  html += `<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="/browserconfig.xml">
<meta name="msapplication-TileColor" content="${tileColor}">
<meta name="msapplication-TileImage" content="${iconPath}/mstile-144x144.png">

`;

  // Theme color metadata for browser UI elements
  html += `<!-- Theme Colors -->
<meta name="theme-color" content="${themeColor}">`;

  return html;
}
