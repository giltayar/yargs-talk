import {fetchApi} from '../pirate-api.js'

export const command = 'names'
export const describe = 'generate pirate names'
export const builder = (/**@type {import('yargs').Argv}*/ yargs) =>
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
    }).strict()

/**
 * @param {ReturnType<ReturnType<typeof builder>['parseSync']>} options
 */
export const handler = async ({gender, limit}) => {
  const result = await fetchApi('generate/name', {
    variation: gender,
    limit: limit.toString(),
  })

  console.log(result.contents.names.join('\n'))
}
