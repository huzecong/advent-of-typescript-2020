import {expect} from 'chai'

import {DefaultDict} from '../../src/utils'

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
})
