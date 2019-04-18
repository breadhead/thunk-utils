import { AnyAction } from 'redux'
import { useDispatch } from 'redux-react-hook'
import { ThunkAction } from 'redux-thunk'

import { ExtraArg } from './ExtraArg'

export const createUseThunk = <UserState, Api>() => () => {
  const dispatch = useDispatch()

  return async <Result = Promise<void>>(
    action: ThunkAction<Result, UserState, ExtraArg<Api>, AnyAction>,
  ) => dispatch(action as any)
}

export type UseThunk<UserState, Api> = () => <Result>(
  action: ThunkAction<Result, UserState, ExtraArg<Api>, AnyAction>,
) => Promise<any>
