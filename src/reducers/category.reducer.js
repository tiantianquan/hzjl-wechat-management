import actions from '../actions'

let actionType = actions.category.actionType

const initialState = {
  list: [],
  edit: {
    EditData: {},
    WechatAccountList: []
  },
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
        list: action.data,
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
        edit: {
          ...action.data,
        },
        isLoading: action.isLoading
      }
    case actionType.CLEAR:
      return {
        ...state,
        edit: initialState.edit
      }
    case actionType.UPDATE_LOADING:
      let res = {
        ...state,
        isLoading: action.isLoading
      }
      res.edit.EditData = action.data
      return res
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
      res = {
        ...state,
        isLoading: action.isLoading
      }
      res.edit.EditData =action.data
      return res
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