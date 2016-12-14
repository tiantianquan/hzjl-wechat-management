import actionType from './actionType.js'
import Api from '../api'
import {message} from 'antd'


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

function clearWechatAccount(data) {
  return {
    type: actionType.CLEAR_WECHATACCOUNT,
    data,
  }
}

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

function updateMsgShowState(haveShow) {
  return{
    type:actionType.UPDATE_MSG_SHOW_STATE,
    haveShow:haveShow 
  }
  
}


export default {
  getWechatAccountListStart,
  // getWechatAccountListLoading,
  // getWechatAccountListEnd,
  getWechatAccountStart,
  // getWechatAccountLoading,
  // getWechatAccountEnd,
  clearWechatAccount,
  updateWechatAccountStart,
  updateMsgShowState
}

export {
  actionType
}