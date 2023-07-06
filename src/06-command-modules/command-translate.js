import {fetchApi} from '../pirate-api.js'

export const command = 'translate <text>'
export const describe = 'translate to "pirate"'
export const builder = (/**@type {import('yargs').Argv}*/ yargs) =>
  yargs.positional('text', {
    type: 'string',
    demandOption: true,
    describe: 'the text to translate',
  })

/**
 * @param {ReturnType<ReturnType<typeof builder>['parseSync']>} options
 */
export const handler = async ({text}) => {
  const result = await fetchApi('translate', {text})

  console.log(result.contents.translated)
}
