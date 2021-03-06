import actions
 from '../actions'

 let actionType = actions.wechatAccount.actionType

const initialState = {
  wechatAccountList: [],
  wechatAccountEdit: {},
  isLoading: false,
  msg: {
    haveShow: true
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_LIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case actionType.GET_LIST_END:
      return {
        ...state,
        wechatAccountList: action.data,
        isLoading: action.isLoading
      }
    case actionType.GET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case actionType.GET_END:
      return {
        ...state,
        wechatAccountEdit: action.data,
        isLoading: action.isLoading
      }
    case actionType.CLEAR:
      return {
        ...state,
        wechatAccountEdit: {}
      }
    case actionType.UPDATE_LOADING:
      return {
        ...state,
        wechatAccountEdit:action.data ,
        isLoading: action.isLoading
      }
    case actionType.UPDATE_END:
      return {
        ...state,
        isLoading: action.isLoading,
        msg: {
          ...action.msg,
          haveShow: false
        }
      }
    case actionType.ADD_LOADING:
      return {
        ...state,
        wechatAccountEdit:action.data ,
        isLoading: action.isLoading
      }
    case actionType.ADD_END:
      return {
        ...state,
        isLoading: action.isLoading,
        msg: {
          ...action.msg,
          haveShow: false
        }
      }
    case actionType.DELETE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case actionType.DELETE_END:
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


export default reducer