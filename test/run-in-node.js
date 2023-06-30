import {execaNode} from 'execa'

/**
 * @param {string} file
 * @param {string[]} args
 */
export async function runInNode(file, ...args) {
  return (
    (
      await execaNode(file, args, {
        all: true,
        env: {FORCE_COLOR: '0'},
      })
    ).all?.split('\n') ?? []
  )
}
