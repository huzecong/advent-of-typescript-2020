import {expect} from 'chai'
import {NodeId} from 'ngraph.graph'

import {BipartiteGraph, createGraph, maximalMatching} from '../../src/utils/graph'
import _ = require('lodash')

describe('utils/graph', () => {
  describe('maximalMatching', () => {
    it('should correctly compute maximal matching', () => {
      const graph: BipartiteGraph = createGraph(false)
      const leftNodes = [0, 1, 2, 3]
      const rightNodes = ['0', '1', '2', '3']
      leftNodes.forEach(x => graph.addNode(x, 'left'))
      rightNodes.forEach(x => graph.addNode(x, 'right'))
      graph.addLink(0, '0').addLink(0, '1').addLink(0, '3')
      graph.addLink(1, '0')
      graph.addLink(2, '0').addLink(2, '2')
      graph.addLink(3, '0').addLink(3, '2').addLink(3, '3')
      const trueMatch = [[0, '1'], [1, '0'], [2, '2'], [3, '3'], ['1', 0], ['0', 1], ['2', 2], ['3', 3]]
      const match = maximalMatching(graph)
      expect([...match.keys()]).to.have.members(_.concat<NodeId>(leftNodes, rightNodes))
      expect([...match.entries()]).to.have.deep.members(trueMatch)
    })
  })
})
