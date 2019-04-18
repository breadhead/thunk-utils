import { Option } from 'tsoption'

export interface FetchingState {
  error: Option<string>
  loading: boolean
}
