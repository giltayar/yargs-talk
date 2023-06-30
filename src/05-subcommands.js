import yargs from 'yargs'
import {fetchApi} from './pirate-api.js'

await yargs(process.argv.slice(2))
  .command(
    'names',
    'generate pirate names',
    (yargs) =>
      yargs
        .option('gender', {
          type: 'string',
          choices: ['male', 'female'],
          demandOption: true,
          describe: 'the gender of the pirate names to generate',
        })
        .option('limit', {
          type: 'number',
          demandOption: false,
          default: 1,
          describe: 'how many names to generate',
        }),
    async ({gender, limit}) => {
      const result = await fetchApi('generate/name', {
        variation: gender,
        limit: limit.toString(),
      })

      console.log(result.contents.names.join('\n'))
    },
  )
  .command(
    'translate <text>',
    'translate to "pirate"',
    (yargs) =>
      yargs.positional('text', {
        type: 'string',
        demandOption: true,
        describe: 'the text to translate',
      }),
    async ({text}) => {
      const result = await fetchApi('translate', {text})

      console.log(result.contents.translated)
    },
  )
  .strict()
  .demandCommand()
  .parseAsync()
