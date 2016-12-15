import {
  actionType
} from '../actions'

const initialState = {
  wechatAccountList: [],
  wechatAccount: {},
  isLoading: false,
  msg: {
    haveShow: true
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_WECHATACCOUNT_LIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case actionType.GET_WECHATACCOUNT_LIST_END:
      return {
        ...state,
        wechatAccountList: action.data,
        isLoading: action.isLoading
      }
    case actionType.GET_WECHATACCOUNT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case actionType.GET_WECHATACCOUNT_END:
      return {
        ...state,
        wechatAccount: action.data,
        isLoading: action.isLoading
      }
    case actionType.CLEAR_WECHATACCOUNT:
      return {
        ...state,
        wechatAccount: {}
      }
    case actionType.UPDATE_WECHATACCOUNT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case actionType.UPDATE_WECHATACCOUNT_END:
      return {
        ...state,
        isLoading: action.isLoading,
        msg: {
          ...action.msg,
          haveShow: false
        }
      }
    case actionType.ADD_WECHATACCOUNT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case actionType.ADD_WECHATACCOUNT_END:
      return {
        ...state,
        isLoading: action.isLoading,
        msg: {
          ...action.msg,
          haveShow: false
        }
      }
    case actionType.UPDATE_MSG_SHOW_STATE:
      return {
        ...state,
        msg: {
          ...state.msg,
          haveShow: action.haveShow
        }
      }
    default:
      return state
  }
}

const rootReducer = reducer

export default rootReducer