import _ from 'lodash'

import Solution from '../solution'
import * as utils from '../utils'

type Food = {
  ingredients: string[];
  allergens: string[];
}

export default class Day21 extends Solution {
  private readonly foods: Food[]

  private readonly ingredients: string[]

  private readonly allergens: string[]

  constructor(inputPath: string) {
    super(inputPath)
    this.foods = this.input.split('\n').map(s => {
      const [ingredients, allergens] = s.split(' (contains ')
      return {
        ingredients: ingredients.split(' '),
        allergens: utils.removeSuffix(allergens, ')').split(', '),
      }
    })
    this.ingredients = _.union(...this.foods.map(food => food.ingredients))
    this.allergens = _.union(...this.foods.map(food => food.allergens))
  }

  private getCandidates(): Map<string, string[]> {
    const candidates: Map<string, string[]> = new Map()
    for (const allergen of this.allergens) {
      const ingredients = _.intersection(
        ...this.foods.mapFilter(food => food.allergens.includes(allergen) ? food.ingredients : null))
      candidates.set(allergen, ingredients)
    }
    return candidates
  }

  protected solvePart1(): number {
    const candidates = this.getCandidates()
    const safeIngredients = new Set(_.difference(this.ingredients, _.union(...candidates.values())))
    return _.sum(this.foods.map(food => food.ingredients.filter(x => safeIngredients.has(x)).length))
  }

  protected solvePart2(): string {
    const graph: utils.graph.BipartiteGraph = utils.graph.createGraph(false)
    const candidates = this.getCandidates()
    for (const [allergen, ingredients] of candidates.entries()) {
      if (ingredients.length === 0) continue
      graph.addNode(allergen, 'left')
      ingredients.forEach(ingredient => {
        graph.addNode(ingredient, 'right')
        graph.addLink(allergen, ingredient)
      })
    }
    const match = utils.graph.maximalMatching(graph)
    return _.sortBy(this.allergens).mapFilter(x => match.get(x)).join(',')
  }
}
