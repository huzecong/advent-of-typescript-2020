import 'ix/add/iterable-operators/average'
import 'ix/add/iterable-operators/buffer'
import 'ix/add/iterable-operators/catcherror'
import 'ix/add/iterable-operators/concat'
import 'ix/add/iterable-operators/concatall'
import 'ix/add/iterable-operators/count'
import 'ix/add/iterable-operators/defaultifempty'
import 'ix/add/iterable-operators/distinct'
import 'ix/add/iterable-operators/distinctuntilchanged'
import 'ix/add/iterable-operators/dowhile'
import 'ix/add/iterable-operators/elementat'
import 'ix/add/iterable-operators/endwith'
import 'ix/add/iterable-operators/every'
import 'ix/add/iterable-operators/except'
import 'ix/add/iterable-operators/expand'
import 'ix/add/iterable-operators/filter'
import 'ix/add/iterable-operators/finalize'
import 'ix/add/iterable-operators/find'
import 'ix/add/iterable-operators/findindex'
import 'ix/add/iterable-operators/first'
import 'ix/add/iterable-operators/flat'
import 'ix/add/iterable-operators/flatmap'
import 'ix/add/iterable-operators/groupby'
import 'ix/add/iterable-operators/groupjoin'
import 'ix/add/iterable-operators/ignoreelements'
import 'ix/add/iterable-operators/includes'
import 'ix/add/iterable-operators/innerjoin'
import 'ix/add/iterable-operators/intersect'
import 'ix/add/iterable-operators/isempty'
import 'ix/add/iterable-operators/last'
import 'ix/add/iterable-operators/map'
import 'ix/add/iterable-operators/max'
import 'ix/add/iterable-operators/maxby'
import 'ix/add/iterable-operators/memoize'
import 'ix/add/iterable-operators/min'
import 'ix/add/iterable-operators/minby'
import 'ix/add/iterable-operators/onerrorresumenext'
import 'ix/add/iterable-operators/orderby'
import 'ix/add/iterable-operators/pairwise'
import 'ix/add/iterable-operators/pluck'
import 'ix/add/iterable-operators/publish'
import 'ix/add/iterable-operators/reduce'
import 'ix/add/iterable-operators/reduceright'
import 'ix/add/iterable-operators/repeat'
import 'ix/add/iterable-operators/retry'
import 'ix/add/iterable-operators/reverse'
import 'ix/add/iterable-operators/scan'
import 'ix/add/iterable-operators/scanright'
import 'ix/add/iterable-operators/sequenceequal'
import 'ix/add/iterable-operators/share'
import 'ix/add/iterable-operators/single'
import 'ix/add/iterable-operators/skip'
import 'ix/add/iterable-operators/skiplast'
import 'ix/add/iterable-operators/skipwhile'
import 'ix/add/iterable-operators/slice'
import 'ix/add/iterable-operators/some'
import 'ix/add/iterable-operators/startwith'
import 'ix/add/iterable-operators/sum'
import 'ix/add/iterable-operators/take'
import 'ix/add/iterable-operators/takelast'
import 'ix/add/iterable-operators/takewhile'
import 'ix/add/iterable-operators/tap'
import 'ix/add/iterable-operators/toarray'
import 'ix/add/iterable-operators/todomstream'
import 'ix/add/iterable-operators/tomap'
import 'ix/add/iterable-operators/tonodestream'
import 'ix/add/iterable-operators/toset'
import 'ix/add/iterable-operators/union'
import 'ix/add/iterable-operators/zip'
import 'ix/add/iterable/catchall'
import 'ix/add/iterable/catcherror'
import 'ix/add/iterable/concat'
import 'ix/add/iterable/create'
import 'ix/add/iterable/defer'
import 'ix/add/iterable/empty'
import 'ix/add/iterable/from'
import 'ix/add/iterable/generate'
import 'ix/add/iterable/iif'
import 'ix/add/iterable/of'
import 'ix/add/iterable/onerrorresumenext'
import 'ix/add/iterable/range'
import 'ix/add/iterable/repeat'
import 'ix/add/iterable/throwerror'
import 'ix/add/iterable/while'
import 'ix/add/iterable/zip'

import {IterableX} from 'ix/iterable/iterablex'

import {count, range} from './iterator'

export {IterableX as Iterable} from 'ix/iterable/iterablex'

declare module 'ix/iterable/iterablex' {
  namespace IterableX {
    function range_(end: number, step?: number): IterableX<number>;
    function range_(start: number, end: number, step?: number): IterableX<number>;

    function count(start?: number): IterableX<number>
  }
}

IterableX.range = function (): never {
  throw new Error('Use `Iterable.range_` in favor of `Iterable.range`')
}

IterableX.range_ = function (start: number, end?: number, step?: number): IterableX<number> {
  // @ts-ignore
  return IterableX.from(range(start, end, step))
}

IterableX.count = function (start?:number): IterableX<number> {
  return IterableX.from(count(start))
}
