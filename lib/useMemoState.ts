import { useCallback, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import isFunction from 'lodash.isfunction'

import { useThunk } from './useThunk'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

export const useMemoState = <T, State, Result>(
  createSelector: () => (state: State) => T,
  refetchAction: () => ThunkAction<Result, any, any, AnyAction>,
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
