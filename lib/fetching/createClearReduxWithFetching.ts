import { combineReducers } from 'redux'

import { ActionsConfig } from 'redux-clear'
import { createClearRedux } from 'redux-clear'
import { createFetchingRedux } from './createFetchingRedux'

export const createClearReduxWithFetching = <State, Actions>(
  actionsConfig: ActionsConfig<State, Actions>,
  initialState: State,
  tag: string = '',
) => {
  const fetchingClearRedux = createFetchingRedux(`${tag}/fetching`)

  const dataClearRedux = createClearRedux(actionsConfig, initialState, tag)

  return {
    reducer: combineReducers({
      fetching: fetchingClearRedux.reducer,
      data: dataClearRedux.reducer,
    }),
    actions: {
      fetching: fetchingClearRedux.actions,
      data: dataClearRedux.actions,
    },
  }
}
