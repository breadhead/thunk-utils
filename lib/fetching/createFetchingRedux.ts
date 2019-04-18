import { Option } from 'tsoption'

import { createClearRedux } from 'redux-clear'
import { FetchingActions } from './FetchingActions'
import { FetchingState } from './FetchingState'

export const createFetchingRedux = (key: string) =>
  createClearRedux<FetchingState, FetchingActions>(
    {
      request: () => () => ({
        loading: true,
        error: Option.of(null),
      }),
      failure: () => error => ({
        loading: false,
        error: Option.of(error),
      }),
      success: () => () => ({
        loading: false,
        error: Option.of(null),
      }),
    },
    {
      loading: false,
      error: Option.of(null),
    },
    key,
  )
