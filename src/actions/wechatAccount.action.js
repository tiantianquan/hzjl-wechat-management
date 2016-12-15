import actionType from './actionType.js'
import Api from '../api'

//微信账户列表
function getWechatAccountListStart() {
  return async function (dispatch) {
    dispatch(getWechatAccountListLoading())
    let data = await Api.getWechatAccountList()
    dispatch(getWechatAccountListEnd(data))
  }
}

function getWechatAccountListLoading() {
  return {
    type: actionType.GET_WECHATACCOUNT_LIST_LOADING,
    isLoading: true
  }
}

function getWechatAccountListEnd(data) {
  return {
    type: actionType.GET_WECHATACCOUNT_LIST_END,
    data,
    isLoading: false
  }
}


//获取微信账户
function getWechatAccountStart(id) {
  return async function (dispatch) {
    dispatch(getWechatAccountLoading())
    let data = await Api.getWechatAccount(id)
    dispatch(getWechatAccountEnd(data))
  }
}

function getWechatAccountLoading() {
  return {
    type: actionType.GET_WECHATACCOUNT_LOADING,
    isLoading: true
  }
}

function getWechatAccountEnd(data) {
  return {
    type: actionType.GET_WECHATACCOUNT_END,
    data,
    isLoading: false
  }
}

//清除页面微信账户
function clearWechatAccount(data) {
  return {
    type: actionType.CLEAR_WECHATACCOUNT,
    data,
  }
}


//更新微信账户
function updateWechatAccountStart(data) {
  return async function (dispatch) {
    dispatch(updateWechatAccountLoading())
    let res = await Api.updateWechatAccount(data)
    dispatch(updateWechatAccountEnd(res))
  }
}

function updateWechatAccountLoading(data) {
  return {
    type: actionType.UPDATE_WECHATACCOUNT_LOADING,
    data,
    isLoading: true
  }
}

function updateWechatAccountEnd(msg) {
  // showMsg(msg)
  return {
    type: actionType.UPDATE_WECHATACCOUNT_END,
    msg: msg,
    isLoading: false
  }
}

//添加微信账户
function addWechatAccountStart(data) {
  return async function (dispatch) {
    dispatch(addWechatAccountLoading())
    let res = await Api.addWechatAccount(data)
    dispatch(addWechatAccountEnd(res))
  }
}

function addWechatAccountLoading(data) {
  return {
    type: actionType.ADD_WECHATACCOUNT_LOADING,
    data,
    isLoading: true
  }
}

function addWechatAccountEnd(msg) {
  return {
    type: actionType.ADD_WECHATACCOUNT_END,
    msg: msg,
    isLoading: false
  }
}

//全局信息显示状态
function updateMsgShowState(haveShow) {
  return {
    type: actionType.UPDATE_MSG_SHOW_STATE,
    haveShow: haveShow
  }
}

export default {
  getWechatAccountListStart,
  getWechatAccountStart,
  clearWechatAccount,
  updateWechatAccountStart,
  addWechatAccountStart,
  updateMsgShowState
}

