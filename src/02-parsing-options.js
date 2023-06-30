import yargs from 'yargs'
import {fetchApi} from './pirate-api.js'

const args = yargs(process.argv.slice(2)).parseSync()

const gender = /**@type {string}*/ (args.gender)
const limit = parseInt(/**@type {string}*/ (args.limit))

const result = await fetchApi('generate/name', {
  variation: gender,
  limit: limit.toString(),
})

console.log(result.contents.names.join('\n'))
