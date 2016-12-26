import {genActionType} from './actionType.js'
import {
  Nav  as Api
} from '../api'

let actionType = genActionType('Nav')


function getListStart() {
  return async function (dispatch) {
    dispatch(getListLoading())
    let data = await Api.getList()
    dispatch(getListEnd(data))
  }
}

function getListLoading() {
  return {
    type: actionType.GET_LIST_LOADING,
    isLoading: true
  }
}

function getListEnd(data) {
  return {
    type: actionType.GET_LIST_END,
    data,
    isLoading: false
  }
}


function getStart(id) {
  return async function (dispatch) {
    dispatch(getLoading())
    let data = await Api.get(id)
    dispatch(getEnd(data))
  }
}

function getLoading() {
  return {
    type: actionType.GET_LOADING,
    isLoading: true
  }
}

function getEnd(data) {
  return {
    type: actionType.GET_END,
    data,
    isLoading: false
  }
}

function clear(data) {
  return {
    type: actionType.CLEAR,
    data,
  }
}


function updateStart(data) {
  return async function (dispatch) {
    dispatch(updateLoading(data))
    let res = await Api.update(data)
    dispatch(updateEnd(res))
  }
}

function updateLoading(data) {
  return {
    type: actionType.UPDATE_LOADING,
    data,
    isLoading: true
  }
}

function updateEnd(msg) {
  // showMsg(msg)
  return {
    type: actionType.UPDATE_END,
    msg: msg,
    isLoading: false
  }
}

function addStart(data) {
  return async function (dispatch) {
    dispatch(addLoading(data))
    let res = await Api.add(data)
    dispatch(addEnd(res))
  }
}

function addLoading(data) {
  return {
    type: actionType.ADD_LOADING,
    data,
    isLoading: true
  }
}

function addEnd(msg) {
  return {
    type: actionType.ADD_END,
    msg: msg,
    isLoading: false
  }
}


function deleteStart(id) {
  return async function (dispatch) {
    dispatch(deleteLoading())
    let res = await Api.delete(id)
    dispatch(deleteEnd(res))
  }
}

function deleteLoading(data) {
  return {
    type: actionType.DELETE_LOADING,
    data,
    isLoading: true
  }
}

function deleteEnd(msg) {
  return {
    type: actionType.DELETE_END,
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
  getListStart,
  getStart,
  clear,
  updateStart,
  addStart,
  deleteStart,
  updateMsgShowState,
  actionType
}