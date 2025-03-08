# Favicons Generator

A simple Node.js tool that generates all standard web icons and favicons from a single source image.

## Features

- **Cross-Platform Support**:
  - Standard favicons for desktop browsers (16x16, 32x32, 48x48, 96x96)
  - Apple Touch Icons for iOS (57x57 to 180x180)
  - Android Chrome icons for PWA support (192x192, 512x512)
  - Microsoft Tile icons for Windows (70x70, 144x144, 150x150, 310x310, 310x150)
  - `.ico` format favicon for legacy browser support

- **Configuration Files**:
  - Generates `site.webmanifest` for Progressive Web App support
  - Creates `browserconfig.xml` for Microsoft browser integration
  - Produces `head-instructions.html` with ready-to-use HTML tags

## Requirements

- Node.js 16.x or later

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tool-buddy/favicons-generator.git
   cd favicons-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Usage

### Command-Line

```bash
npx generate-favicons <source-image> <app-name> [output-folder]
```

#### Command-Line Arguments

| Argument | Description | Required | Default |
|----------|-------------|----------|---------|
| `<source-image>` | Path to your logo/image file (PNG recommended) | Yes | - |
| `<app-name>` | Name of your application (used in manifests) | Yes | - |
| `[output-folder]` | Custom output directory | No | "static" |

#### Command-Line Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help instructions |
| `--verbose` | `-v` | Enable verbose mode with detailed output logs |

#### Usage Examples

```bash
# Basic usage
npx generate-favicons logo.png "My Application"

# Show help instructions
npx generate-favicons --help
```

### Via Node.js API

You can also use the library programmatically:

```javascript
import { generateIcons } from 'favicons-generator';

async function createIcons() {
  try {
    const result = await generateIcons({
      sourceImage: 'path/to/logo.png',
      name: 'My Application',
      outputDir: 'static'
    });
    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

createIcons();
```

## Output Files

The generator creates the following file structure:

```
<output-folder>/
├── favicon.ico
├── browserconfig.xml
├── site.webmanifest
├── head-instructions.html
└── icons/
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── favicon-48x48.png
    ├── favicon-96x96.png
    ├── apple-touch-icon.png (180x180)
    ├── apple-touch-icon-57x57.png
    ├── apple-touch-icon-60x60.png
    ├── apple-touch-icon-72x72.png
    ├── apple-touch-icon-76x76.png
    ├── apple-touch-icon-114x114.png
    ├── apple-touch-icon-120x120.png
    ├── apple-touch-icon-144x144.png
    ├── apple-touch-icon-152x152.png
    ├── apple-touch-icon-180x180.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    ├── mstile-70x70.png
    ├── mstile-144x144.png
    ├── mstile-150x150.png
    ├── mstile-310x310.png
    └── mstile-310x150.png
```

## HTML Integration

After generating the icons, copy the contents of `head-instructions.html` into your website's `<head>` section. This file contains all the necessary HTML tags to properly integrate the generated icons.

Example of the generated HTML:

```html
<!-- favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-touch-icon-57x57.png">
<!-- Additional Apple Touch Icon sizes... -->

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="/browserconfig.xml">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/icons/mstile-144x144.png">

<!-- Theme Colors -->
<meta name="theme-color" content="#ffffff">
```
## Acknowledgements

This tool uses the following open-source libraries:
- [sharp](https://sharp.pixelplumbing.com/) - High performance Node.js image processing
- [png-to-ico](https://www.npmjs.com/package/png-to-ico) - Convert PNG to ICO files
