import {expect} from 'chai'

import {range} from '../../src/utils'

describe('utils/iterator', () => {
  describe('range', () => {
    it('should work with negative step', () => {
      const iter = range(10, -3, -2)
      expect([...iter]).to.deep.equal([10, 8, 6, 4, 2, 0, -2])
    })
  })
})
