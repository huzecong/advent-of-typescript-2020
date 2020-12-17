import {expect} from 'chai'

import {array, cartesianProduct, combinations, mapFilter, product, zip, zipShortest} from '../../src/utils'

describe('utils/array', () => {
  describe('cartesianProduct', () => {
    it('should compute the Cartesian product', () =>
      expect(cartesianProduct(['a', 'b'], [1], [true, false]))
      .to.deep.equal([['a', 1, true], ['a', 1, false], ['b', 1, true], ['b', 1, false]]))
    it('should return an empty array if passed no arguments', () =>
      expect(cartesianProduct()).to.deep.equal([]))
    it('should return an empty array if any list is empty', () =>
      expect(cartesianProduct(['a', 'b'], [])).to.deep.equal([]))
  })

  describe('zipShortest', () => {
    it('should return a list with the same length as the shortest input', () =>
      expect(zipShortest([1, 2, 3, 4], [1, 2, 3])).to.deep.equal([[1, 1], [2, 2], [3, 3]]))
    it('should error if no input is provided', () =>
      expect(() => zipShortest()).to.throw('at least one'))
  })

  describe('zip', () => {
    it('should return zipped lists', () =>
      expect(zip([1, 2, 3], [4, 5, 6], [7, 8, 9])).to.deep.equal([[1, 4, 7], [2, 5, 8], [3, 6, 9]]))
    it('should error if no input is provided', () =>
      expect(() => zip()).to.throw('at least one'))
    it('should error if inputs are of difference lengths', () =>
      expect(() => zip([1, 2, 3], [1, 2])).to.throw('different length'))
  })

  describe('mapFilter', () => {
    it('should filter out null values', () =>
      expect(mapFilter(x => x % 2 === 0 ? x : null, [1, 2, 3, 4])).to.deep.equal([2, 4]))
  })

  describe('array', () => {
    it('should create an array with n copies of the same value', () =>
      expect(array('a', 5)).to.deep.equal(['a', 'a', 'a', 'a', 'a']))
    it('should work with n = 0', () =>
      expect(array('a', 0)).to.deep.equal([]))
    it('should error if n < 0', () =>
      expect(() => array('a', -1)).to.throw('non-negative'))
  })

  describe('combinations', () => {
    it('should return all unordered k-combinations', () => {
      expect(combinations([1, 2, 3], 2)).to.deep.equal([[1, 2], [1, 3], [2, 3]])
      expect(combinations([1, 2, 3], 3)).to.deep.equal([[1, 2, 3]])
    })
    it('should error if k is greater than length', () =>
      expect(() => combinations([1, 2, 3], 4)).to.throw())
    it('should error if k is not positive', () => {
      expect(() => combinations([1, 2, 3], 0)).to.throw('positive')
      expect(() => combinations([1, 2, 3], -2)).to.throw('positive')
    })
  })

  describe('product', () => {
    it('should return the product of numbers in the list', () =>
      expect(product([1, 2, 3, 4])).to.equal(24))
    it('should return 1 for empty list', () =>
      expect(product([])).to.equal(1))
  })
})
