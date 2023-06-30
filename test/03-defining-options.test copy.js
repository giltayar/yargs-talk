import {describe, it} from 'node:test'
import {jestExpect as expect} from '@jest/expect'
import {runInNode} from './run-in-node.js'

describe('03-defining options', () => {
  it('should execute command line with options', async () => {
    expect(
      await runInNode(
        'src/03-defining-options.js',
        '--gender',
        'male',
        '--limit',
        '2',
      ),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
    ])
  })

  it('should support alias options', async () => {
    expect(
      await runInNode('src/03-defining-options.js', '-g', 'male', '-l', '1'),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
    ])
  })

  it('should support default options', async () => {
    expect(
      await runInNode('src/03-defining-options.js', '--gender', 'female'),
    ).toMatchObject([
      expect.stringMatching(/[a-zA-z]+ '[a-zA-Z- ]+' [a-zA-Z]+/),
    ])
  })

  it('should show help', async () => {
    expect(
      await runInNode('src/03-defining-options.js', '--help'),
    ).toMatchObject([
      expect.stringMatching(/03-defining-options/),
      expect.stringMatching(''),
      expect.stringMatching(/generate pirate names/),
      expect.stringMatching(''),
      expect.stringMatching(/Options/),
      expect.stringMatching(/--help.*Show help/),
      expect.stringMatching(/Show version number/),
      expect.stringMatching(/--gender.*the gender of the pirate/),
      expect.any(String),
      expect.stringMatching(/--limit.*how many/),
    ])
  })

  it('should show version', async () => {
    expect(
      await runInNode('src/03-defining-options.js', '--version'),
    ).toMatchObject([expect.stringMatching('1.2.3')])
  })

  it('should fail if the user didnt pass the correct options', async () => {
    await expect(runInNode('src/03-defining-options.js')).rejects.toThrow(
      /Options.*Missing required argument: gender/s,
    )
  })

  it('should fail if choice does not validate', async () => {
    await expect(
      runInNode('src/03-defining-options.js', '--gender=email'),
    ).rejects.toThrow(
      /Options.*Argument: gender, Given: "email", Choices: "male", "female"/s,
    )
  })

  it('should fail if the user passed an unknown option', async () => {
    await expect(
      runInNode('src/03-defining-options.js', '--gender=male', '--foobar'),
    ).rejects.toThrow(/Options.*Unknown argument: foobar/s)
  })
})
