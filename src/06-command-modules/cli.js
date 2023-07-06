import yargs from 'yargs'

await yargs(process.argv.slice(2))
  // @ts-expect-error
  .command(await import('./command-names.js'))
  // @ts-expect-error
  .command(await import('./command-translate.js'))
  .strict()
  .demandCommand()
  .parseAsync()
