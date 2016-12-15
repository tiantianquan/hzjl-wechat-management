import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { MainView, WechatAccountListView, WechatAccountEditView } from './containers'
import reducers from './reducers'
import './style/style.scss'


//react-router-redux
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
})


let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const history = syncHistoryWithStore(browserHistory, store)

const routeConfig = [
  {
    path: '/',
    component: MainView,
    indexRoute: { component: null },
    childRoutes: [
      {
        path: 'WechatAccountList',
        component: WechatAccountListView,
        childRoutes: [{
          path: 'Edit/:id',
          component: WechatAccountEditView
        },{
          path:'Add',
          component:WechatAccountEditView
        }],
      },
      {
        path: '2',
        component: () => (
          <div>2</div>
        )
      },
    ],
  }
]



const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <Router routes={routeConfig} history={history}>
        </Router>
      </Provider>
    )
  }
})


const mountNode = document.querySelector("#app")
ReactDOM.render(<App />, mountNode)
