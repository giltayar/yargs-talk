import {describe, it} from 'node:test'
import {jestExpect as expect} from '@jest/expect'
import {runInNode} from './run-in-node.js'

describe('06-command-modules', () => {
  describe('subcommand "translate"', () => {
    it('should execute command line with arguments', async () => {
      expect(
        await runInNode('src/06-command-modules/cli.js', 'translate', 'hello'),
      ).toMatchObject([expect.stringMatching('Ahoy')])
    })

    it('should show help on all commands', async () => {
      expect(
        await runInNode('src/06-command-modules/cli.js', '--help'),
      ).toMatchObject([
        expect.stringMatching(/cli.js <command>/),
        expect.stringMatching(''),
        expect.stringMatching(/Commands:/),
        expect.stringMatching(/names.*generate pirate names/),
        expect.stringMatching(/translate <text>.*translate to "pirate"/),
        expect.stringMatching(''),
        expect.stringMatching(/Options:/),
        expect.stringMatching(/--help.*Show help/),
        expect.stringMatching(/--version.*Show version number/),
      ])
    })

    it('should show help on translate', async () => {
      expect(
        await runInNode('src/06-command-modules/cli.js', 'translate', '--help'),
      ).toMatchObject([
        expect.stringMatching(/cli.js translate <text>/),
        expect.stringMatching(''),
        expect.stringMatching(/translate to "pirate"/),
        expect.stringMatching(''),
        expect.stringMatching(/Positionals:/),
        expect.stringMatching(/text.*text to translate/),
        expect.stringMatching(''),
        expect.stringMatching(/Options:/),
        expect.stringMatching(/--help.*Show help/),
        expect.stringMatching(/--version.*Show version number/),
      ])
    })
    // ...
  })
  describe('subcommand "names"', () => {
    it('should execute command line with options', async () => {
      expect(
        await runInNode(
          'src/06-command-modules/cli.js',
          'names',
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
    // ...
  })
})
