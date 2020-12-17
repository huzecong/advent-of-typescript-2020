import {expect} from 'chai'

import {countChar, removePrefix, removeSuffix} from '../../src/utils'

describe('utils/string', () => {
  describe('removePrefix', () => {
    it('should remove the prefix if it is a prefix', () =>
      expect(removePrefix('abcdef', 'abc')).to.equal('def'))
    it("should preserve the string if it's not a prefix", () =>
      expect(removePrefix('abcdef', 'bcd')).to.equal('abcdef'))
  })

  describe('removeSuffix', () => {
    it('should remove the suffix if it is a suffix', () =>
      expect(removeSuffix('abcdef', 'def')).to.equal('abc'))
    it("should preserve the string if it's not a suffix", () =>
      expect(removeSuffix('abcdef', 'bcd')).to.equal('abcdef'))
  })

  describe('countChar', () => {
    it('should count the number of character occurrences', () =>
      expect(countChar('aabcabcde', 'a')).to.equal(3))
  })
})
