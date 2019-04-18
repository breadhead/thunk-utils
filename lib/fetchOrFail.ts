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
  getApi: () => Api,
  getState: () => State,
) => Promise<void | any>

const defaultActions: FetchActions = {
  request: () => ({ type: '' }),
  success: () => ({ type: '' }),
  failure: () => ({ type: '' }),
}

export const createFetchOrFail = <State, Api>() => (
  fetchActions: FetchActions = defaultActions,
  execute: Execute<State, Api>,
) => async (
  dispatch: ThunkDispatch<State, ExtraArg<Api>, AnyAction>,
  getState: () => State,
  createApi: (token: Option<string>) => Api,
) => {
  const { request, success, failure } = fetchActions
  try {
    dispatch(request())

    // TODO: fix token
    await execute(dispatch, () => createApi(Option.of('')), getState)

    dispatch(success())
  } catch (e) {
    dispatch(failure(tryOr(() => e.response.data.message, e.message)))

    throw e
  }
}
