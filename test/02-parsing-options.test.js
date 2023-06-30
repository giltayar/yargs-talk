import {describe, it} from 'node:test'
import {jestExpect as expect} from '@jest/expect'
import {runInNode} from './run-in-node.js'

describe('02-parsing options', () => {
  it('should parse a simple command line with options', async () => {
    expect(
      await runInNode(
        'src/02-parsing-options.js',
        '--gender',
        'male',
        '--limit',
        '2',
      ),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
    ])
  })

  it('should parse a simple command line with options in alternative syntax', async () => {
    expect(
      await runInNode(
        'src/02-parsing-options.js',
        '--gender=male',
        '--limit=3',
      ),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z\- ]+' [a-zA-Z]+/),
    ])
  })

  it('should fail if the user didnt pass the correct options', async () => {
    await expect(
      runInNode('src/02-parsing-options.js', '--gender=female', '--klimt=5'),
    ).rejects.toThrow(/Cannot read properties of undefined/)
  })
})
