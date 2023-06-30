import {describe, it} from 'node:test'
import {jestExpect as expect} from '@jest/expect'
import {runInNode} from './run-in-node.js'

describe('01-parsing args', () => {
  it('should parse a simple command line', async () => {
    expect(
      await runInNode('src/01-parsing-args.js', 'female', '2'),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
    ])
  })

  it('should fail if the user didnt pass the correct args', async () => {
    await expect(runInNode('src/01-parsing-args.js', 'female')).rejects.toThrow(
      /Cannot read properties of undefined/,
    )
  })
})
