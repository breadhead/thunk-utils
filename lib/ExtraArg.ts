import { Option } from 'tsoption'

export type ExtraArg<Api> = (token: Option<string>) => Api
