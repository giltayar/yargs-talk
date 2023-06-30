/**
 * @param {any} path
 * @param {Record<string, string>} parameters
 */
export async function fetchApi(path, parameters) {
  const response = await fetch(
    new URL(`${path}?${new URLSearchParams(parameters)}`, apiBase),
    {
      headers: {
        'X-FunGenerators-Api-Secret':
          process.env.FUN_GENERATORS_API_SECRET ?? '',
      },
    },
  )
  return await response.json()
}

const apiBase = 'https://api.fungenerators.com/pirate/'
