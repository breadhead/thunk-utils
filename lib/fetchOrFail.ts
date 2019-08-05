import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { ExtraArg } from './ExtraArg'
import { tryOr } from './tryOr'
import { Option } from 'tsoption'

interface FetchActions {
  request: () => AnyAction
  success: () => AnyAction
  failure: (error: string) => AnyAction
}

type Execute<State, Api> = (
  dispatch: ThunkDispatch<State, ExtraArg<Api>, AnyAction>,
  getApi: (isProd?: boolean) => Api,
  getState: () => State,
) => Promise<void | any>

const defaultActions: FetchActions = {
  request: () => ({ type: '' }),
  success: () => ({ type: '' }),
  failure: () => ({ type: '' }),
}

export const createFetchOrFail = <State, Api>(
  selectToken: (state: State) => Option<string>,
) => (
  fetchActions: FetchActions = defaultActions,
  execute: Execute<State, Api>,
) => async (
  dispatch: ThunkDispatch<State, ExtraArg<Api>, AnyAction>,
  getState: () => State,
  createApi: (token: Option<string>, isProd?: boolean) => Api,
) => {
  const { request, success, failure } = fetchActions
  try {
    dispatch(request())

    const token = selectToken(getState())

    const result = await execute(
      dispatch,
      (isProd = true) => createApi(token, isProd),
      getState,
    )

    dispatch(success())

    return result
  } catch (e) {
    dispatch(failure(tryOr(() => e.response.data.message, e.message)))

    throw e
  }
}
