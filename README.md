# thunk-utils

Utility belt for react redux app

## API

1. `useMemoState`

### Usage

```

const article = useMemoState(
    () => selectArticleById(id),
    () => fetchArticlePage(id),
    [id],
  )

```

### Type

```
useMemoState: <T, State, Result>(
  createSelector: () => (state: State) => T,
  refetchAction: () => ThunkAction<Result, any, any, AnyAction>,
  deps: any[],
) => T
```

`createFetchOrFail`

### Usage

```

import { createFetchOrFail } from '@breadhead/thunk-utils'

import { State } from './State'
import { Api } from '../api'
export const fetchOrFail = createFetchOrFail<State, Api>()

-----------------------


import { fetchLecturesRequest } from '../api/fetchLecturesRequest'
import { actions } from '../reducer/list'
import { fetchOrFail } from '@app/domain/store/fetchOrFail'

export const fetchLecturesList = () =>
  fetchOrFail(actions.fetching, async (dispatch, getApi) => {
    const lectures = await fetchLecturesRequest(getApi())()
    await dispatch(actions.data.addLectures(lectures))
  })


```

### Type


```
createFetchOrFail: <State, Api>() => (
  fetchActions: FetchActions,
  execute: Execute<State, Api>,
) => (
  dispatch: ThunkDispatch<State, ExtraArg<Api>, AnyAction>,
  getState: () => State,
  createApi: (token: Option<string>) => Api,
) => Promise<void>
```

`useThunk`


### Usage

```

const dispatch = useThunk()

  const addToFavs = useCallback(async () => {
    await dispatch(addToFavorites(id, type))
  }, [id, type, dispatch])

```

### Type

```
useThunk: () => <Result = Promise<void>>(
  action: ThunkAction<Result, any, any, AnyAction>,
) => Promise<any>
```


`createClearReduxWithFetching`

### Usage

```

import {
  ClearAction,
  createClearReduxWithFetching,
  WithFetchingState,
} from 'redux-clear'
import { uniqBy } from 'lodash'

import { ArticleModel } from '@app/models/article/ArticleModel'

type InternalState = ArticleModel[]
export type State = WithFetchingState<InternalState>

export interface Actions {
  addArticle: ClearAction<[ArticleModel]>
}

const { reducer, actions } = createClearReduxWithFetching<
  InternalState,
  Actions
>(
  {
    addArticle: state => article => uniqBy([...state, article], 'id'),
  },
  [],
  'article',
)

export { reducer, actions }

```

### Type


```
createClearReduxWithFetching: <State, Actions>(
  actionsConfig: ActionsConfig<State, Actions>,
  initialState: State,
  tag?: string,
) => {
  reducer: Reducer<
    {
      fetching: import('.').FetchingState
      data: State
    },
    AnyAction
  >
  actions: {
    fetching: {
      request: () => AnyAction
      failure: (args_0: string) => AnyAction
      success: () => AnyAction
    }
    data: {
      [key in keyof Actions]: (
        ...args: import('./utils/ArrayOrUnknown').ArrayOrUnknown<Actions[key]>
      ) => AnyAction
    }
  }
}
```

`createFetchingRedux`

### Usage

```

import { createFetchingRedux, FetchingState } from 'redux-clear'

export type State = FetchingState

const { reducer, actions } = createFetchingRedux('login/')

export { reducer, actions }


```

### Type


```
createFetchingRedux: (
  key: string,
) => ClearRedux<FetchingState, FethcingActions>
```