import { AnyAction } from 'redux'
import { useDispatch } from 'redux-react-hook'
import { ThunkAction } from 'redux-thunk'

export const useThunk = () => {
  const dispatch = useDispatch()

  return async <Result = Promise<void>>(
    action: ThunkAction<Result, any, any, AnyAction>,
  ) => dispatch(action as any)
}
