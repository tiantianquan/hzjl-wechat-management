import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import View from './containers'
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
    component: View.MainView,
    indexRoute: { component: null },
    childRoutes: [
      {
        path: 'WechatAccountList',
        component: View.WechatAccountListView,
        childRoutes: [{
          path: 'Edit/:id',
          component: View.WechatAccountEditView
        },{
          path:'Add',
          component:View.WechatAccountEditView
        }],
      },
      {
        path: 'CategoryList',
        component:View.CategoryListView,
        childRoutes: [{
          path: 'Edit/:id',
          component: View.CategoryEditView
        },{
          path:'Add',
          component:View.CategoryEditView
        }],
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
