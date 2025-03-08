import fs from 'fs';
/**
 * CLI arguments parser module
 */

/**
 * Interface for parsed CLI arguments
 */
export interface ParsedArgs {
  sourceImage: string;
  appName: string;
  outputFolder?: string;
  showHelp: boolean;
  verbose: boolean;
}

/**
 * Parse command line arguments
 * @returns {ParsedArgs} Parsed CLI arguments
 */
export function parseArgs(argv = process.argv.slice(2)): ParsedArgs {
  const showHelp: boolean = argv.includes('--help') || argv.includes('-h');
  const verbose: boolean = argv.includes('--verbose') || argv.includes('-v');

  // Filter out the flags to get positional arguments
  const posArgs = argv.filter(arg => !arg.startsWith('-'));

  const sourceImage: string = posArgs[0];
  const appName: string = posArgs[1];
  const outputFolder: string | undefined = posArgs.length >= 3 ? posArgs[2] : undefined;

  return {
    sourceImage,
    appName,
    outputFolder,
    showHelp,
    verbose,
  };
}

export function validateArgs(args: ParsedArgs): string | null {
  let error: string | null;
  if (!args.sourceImage) {
    error = 'Source image path is required';
  } else if (!args.appName) {
    error = 'Application name is required';
  } else if (!fs.existsSync(args.sourceImage)) {
    error = `Source image "${args.sourceImage}" not found`;
  } else {
    error = null;
  }
  return error;
}
