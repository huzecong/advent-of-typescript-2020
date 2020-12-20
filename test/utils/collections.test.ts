import {expect} from 'chai'

import {DefaultDict, smartArray} from '../../src/utils'

describe('utils/collections', () => {
  describe('DefaultDict', () => {
    it('should call factory for unset keys', () => {
      const dict = new DefaultDict<number, number[]>(() => [])
      dict.get(0).push(0)
      dict.get(1).push(1)
      expect(dict.get(0)).to.deep.equal([0])
      expect(dict.get(1)).to.deep.equal([1])
    })
  })

  describe('smartArray', () => {
    it('should work with negative indices', () => {
      const arr = smartArray([0])
      arr.push(1)
      arr.push(2)
      arr.push(3)
      expect(arr[0]).to.equal(0)
      expect(arr[-1]).to.equal(3)
      expect(arr[-2]).to.equal(2)
      expect(arr.pop()).to.equal(3)
      expect(arr[-1]).to.equal(2)
      arr[-1] = 4
      expect(arr[-1]).to.equal(4)
      expect(arr.length === 3)
      // `Array.prototype.slice` actually supports negative indices directly.
      expect(arr.slice(-2)).to.deep.equal([1, 4])
    })
  })
})
