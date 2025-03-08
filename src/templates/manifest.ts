/**
 * Web App Manifest Template Generator
 *
 * This module generates the site.webmanifest file content, which is essential for
 * Progressive Web Applications (PWAs). The web manifest provides metadata about
 * the web application including name, icons, theme colors, and display preferences.
 *
 * The manifest is used by browsers and mobile devices when a user adds the site
 * to their home screen or installs it as a PWA.
 *
 * @module templates/manifest
 */

/**
 * Interface for a web manifest icon entry.
 * Each icon entry specifies a different size/version of the application icon.
 *
 * @interface WebManifestIcon
 * @property {string} src - Path to the icon file
 * @property {string} sizes - Dimensions of the icon (e.g., "192x192")
 * @property {string} type - MIME type of the icon (typically "image/png")
 */
export interface WebManifestIcon {
  src: string;
  sizes: string;
  type: string;
}

/**
 * Interface for the complete web manifest object.
 * This structure follows the W3C Web App Manifest specification.
 *
 * @interface WebManifest
 * @property {string} name - Full name of the application
 * @property {string} short_name - Short version of the name for space-constrained contexts
 * @property {WebManifestIcon[]} icons - Array of icon objects for different sizes
 * @property {string} theme_color - Primary theme color of the application
 * @property {string} background_color - Background color used during app loading
 * @property {string} display - Display mode preference ("standalone", "fullscreen", etc.)
 */
export interface WebManifest {
  name: string;
  short_name: string;
  icons: WebManifestIcon[];
  theme_color: string;
  background_color: string;
  display: string;
}

/**
 * Interface for options used to generate the web manifest.
 * These options allow customization of the generated manifest file.
 *
 * @interface WebManifestOptions
 * @property {string} name - Full application name
 * @property {string} shortName - Short version of the name (used for home screen)
 * @property {string} themeColor - Primary theme color (hex format, e.g., "#ffffff")
 * @property {string} backgroundColor - App background color (hex format, e.g., "#ffffff")
 * @property {string} display - Display mode preference ("standalone", "fullscreen", "minimal-ui", "browser")
 * @property {string} iconPath - Base path to the icon directory (e.g., "/icons")
 */
export interface WebManifestOptions {
  /** Application name */
  name: string;
  /** Application short name */
  shortName: string;
  /** Theme color */
  themeColor: string;
  /** Background color */
  backgroundColor: string;
  /** Display mode */
  display: string;
  /** Path to the icons directory */
  iconPath: string;
}

/**
 * Generate a site.webmanifest file content.
 * This function creates a manifest object that can be serialized to JSON
 * and saved as site.webmanifest at the root of the web application.
 *
 * @param {WebManifestOptions} options - Customization options for the manifest
 * @returns {WebManifest} - Complete web manifest object ready to be serialized to JSON
 *
 * @example
 * // Generate a basic PWA manifest
 * const manifest = generateWebManifest({
 *   name: 'My Application',
 *   shortName: 'MyApp',
 *   themeColor: '#4285f4',
 *   backgroundColor: '#ffffff',
 *   display: 'standalone',
 *   iconPath: '/icons'
 * });
 */
export function generateWebManifest(options: WebManifestOptions): WebManifest {
  const { name, shortName, themeColor, backgroundColor, display, iconPath } = options;

  return {
    name,
    short_name: shortName,
    icons: [
      {
        src: `${iconPath}/android-chrome-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${iconPath}/android-chrome-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: themeColor,
    background_color: backgroundColor,
    display,
  };
}
