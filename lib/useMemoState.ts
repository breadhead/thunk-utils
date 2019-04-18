import { useCallback, useEffect } from 'react'
import { useMappedState } from 'redux-react-hook'
import isFunction from 'lodash.isfunction'

import { createUseThunk } from './useThunk'

export const createUseMemoState = <UserState, Api>() => <T>(
  createSelector: () => (state: UserState) => T,
  refetchAction: () => any,
  deps: any[]
) => {
  const dispatch = createUseThunk<UserState, Api>()()

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
