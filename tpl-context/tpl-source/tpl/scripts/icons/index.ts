import yargs from 'yargs';
import generate from './commands/generate.js';

// Don't forget `.argv` at the end of this chain. Without it, argument parsing will silently fail!
await yargs(process.argv.slice(2))
  // Disallow unknown commands
  .strict(true)
  // Use the full Terminal width when printing help text
  .wrap(null)
  /**
   * Add additional aliases for built-in `--help` and `--version` flags
   * @see https://devhints.io/yargs
   */
  .alias('h', 'help')
  .alias('v', 'version')
  /**
   * Register command modules
   * @see https://github.com/yargs/yargs/blob/63e1173/docs/advanced.md#providing-a-command-module
   */
  .command(generate)
  // .command(verify)
  // We may throw errors due to icon filename conflicts and the like, so don't also print `--help`
  .showHelpOnFail(false)
  /**
   * Demand a command --- otherwise, the CLI will exit without printing anything
   * @see https://yargs.js.org/docs/#api-reference-demandcommandmin1-max-minmsg-maxmsg
   */
  .demandCommand(1, 'Please choose a command').argv;
