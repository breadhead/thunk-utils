import { useCallback, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import isFunction from 'lodash.isfunction'

import { useThunk } from './useThunk'

export const useMemoState = <T, State>(
  createSelector: () => (state: State) => T,
  refetchAction: () => any,
  deps: any[],
) => {
  const dispatch = useThunk()

  const selector = useCallback(createSelector(), deps)

  const state = useMappedState(selector)

  const isEmpty = useCallback(() => {
    if (state && isFunction((state as any).isEmpty)) {
      return (state as any).isEmpty()
    }

    return !!state
  }, [state])

  useEffect(() => {
    dispatch(refetchAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, isEmpty()])

  return state
}
