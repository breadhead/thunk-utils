import { ClearAction } from 'redux-clear'

export interface FetchingActions {
  request: ClearAction
  failure: ClearAction<[string]>
  success: ClearAction
}
