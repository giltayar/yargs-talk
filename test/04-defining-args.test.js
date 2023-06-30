import {describe, it} from 'node:test'
import {jestExpect as expect} from '@jest/expect'
import {runInNode} from './run-in-node.js'

describe('05-defining options', () => {
  it('should execute command line with options', async () => {
    expect(
      await runInNode('src/04-defining-args.js', 'male', '2'),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
    ])
  })

  it('should support default options', async () => {
    expect(await runInNode('src/04-defining-args.js', 'female')).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
    ])
  })

  it('should show help', async () => {
    expect(await runInNode('src/04-defining-args.js', '--help')).toMatchObject([
      expect.stringMatching(/04-defining-args/),
      expect.stringMatching(''),
      expect.stringMatching(/generate pirate names/),
      expect.stringMatching(''),
      expect.stringMatching(/Positionals/),
      expect.stringMatching(/gender.*the gender of the pirate/),
      expect.any(String),
      expect.stringMatching(/limit.*how many/),
      expect.stringMatching(''),
      expect.stringMatching(/Options/),
      expect.stringMatching(/--help.*Show help/),
      expect.stringMatching(/Show version number/),
    ])
  })

  it('should show version', async () => {
    expect(
      await runInNode('src/04-defining-args.js', '--version'),
    ).toMatchObject([expect.stringMatching('1.2.3')])
  })

  it('should fail if the user didnt pass enough arguments', async () => {
    await expect(runInNode('src/04-defining-args.js')).rejects.toThrow(
      /Options.*Not enough non-option arguments/s,
    )
  })

  it('should fail if choice does not validate', async () => {
    await expect(runInNode('src/04-defining-args.js', 'email')).rejects.toThrow(
      /Options.*Argument: gender, Given: "email", Choices: "male", "female"/s,
    )
  })
})
