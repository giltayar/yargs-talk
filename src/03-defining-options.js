import yargs from 'yargs'
import {fetchApi} from './pirate-api.js'

const args = yargs(process.argv.slice(2))
  .command('$0', 'generate pirate names') //optional
  .option('gender', {
    alias: 'g',
    type: 'string',
    choices: ['male', 'female'],
    demandOption: true,
    describe: 'the gender of the pirate names to generate',
  })
  .option('limit', {
    alias: 'l',
    type: 'number',
    demandOption: false,
    default: 1,
    describe: 'how many names to generate',
  })
  .strict()
  .parseSync()

const {gender, limit} = args

const result = await fetchApi('generate/name', {
  variation: gender,
  limit: limit.toString(),
})

console.log(result.contents.names.join('\n'))
