import * as ngraph from 'ngraph.graph'
import {default as _createGraph, Link, Node, NodeId} from 'ngraph.graph'

import {mapFilter} from './array'

type BipartiteSide = 'left' | 'right'
export type BipartiteGraph<TEdge = any> = Graph<BipartiteSide, TEdge>

interface Graph<TNode, TEdge> extends Omit<ngraph.Graph<TNode, TEdge>, 'addNode' | 'addLink'> {
  directed: boolean;
  addNode(node: NodeId, data?: TNode): this;
  addLink(from: NodeId, to: NodeId, data?: TEdge): this;
  getAllNodes(): Node<TNode>[];
  getAllLinks(): Link<TEdge>[];
  getLinks(nodeId: NodeId): Link<TEdge>[];
  getNodesLinkedTo(node: NodeId): Node<TNode>[];
}

/**
 * Create a directed graph.
 */
export function createGraph<TNode, TEdge>(directed = true): Graph<TNode, TEdge> {
  const graph = _createGraph() as unknown as Graph<TNode, TEdge>
  graph.directed = directed

  const _addNode = graph.addNode
  graph.addNode = function (node: NodeId, data?: TNode) {
    _addNode(node, data)
    return graph
  }

  const _addLink = graph.addLink
  if (directed) {
    graph.addLink = function (from: NodeId, to: NodeId, data?: TEdge) {
      _addLink(from, to, data)
      return graph
    }
  } else {
    graph.addLink = function (from: NodeId, to: NodeId, data?: TEdge, dataRev?: TEdge) {
      _addLink(from, to, data)
      _addLink(to, from, dataRev ?? data)
      return graph
    }
  }

  graph.getAllNodes = function (): Node<TNode>[] {
    const nodes: Node<TNode>[] = []
    graph.forEachNode(node => {
      nodes.push(node)
    })
    return nodes
  }

  graph.getAllLinks = function (): Link<TEdge>[] {
    const links: Link<TEdge>[] = []
    graph.forEachLink(link => {
      links.push(link)
    })
    return links
  }

  const _getLinks = graph.getLinks
  graph.getLinks = function (nodeId: NodeId): Link<TEdge>[] {
    return _getLinks(nodeId) ?? []
  }

  graph.getNodesLinkedTo = function (nodeId: NodeId): Node<TNode>[] {
    return mapFilter(graph.getLinks(nodeId), link => link.fromId === nodeId ? link.toId : null).map(x => graph.getNode(x)!)
  }

  return graph
}

/**
 * Compute maximal matching of a bipartite graph using the Hungarian algorithm.
 */
export function maximalMatching<TEdge>(graph: BipartiteGraph<TEdge>): Map<NodeId, NodeId> {
  if (graph.directed) throw new Error('The bipartite graph should not be directed')
  const leftNodes = graph.getAllNodes().filter(node => node.data === 'left').map(node => node.id)
  const match: Map<NodeId, NodeId> = new Map()
  const visit: Set<NodeId> = new Set()

  const find: (leftId: NodeId) => boolean = leftId => {
    for (const rightNode of graph.getNodesLinkedTo(leftId)) {
      const rightId = rightNode.id
      if (visit.has(rightId)) continue
      visit.add(rightId)
      if (!match.has(rightId) || find(match.get(rightId)!)) {
        match.set(leftId, rightId)
        match.set(rightId, leftId)
        return true
      }
    }
    return false
  }

  for (const leftId of leftNodes) {
    visit.clear()
    find(leftId)
  }
  return match
}
