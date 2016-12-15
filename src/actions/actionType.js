 let commonType = {
  GET_LIST_START: 'GET_LIST_START',
  GET_LIST_LOADING: 'GET_LIST_LOADING',
  GET_LIST_END: 'GET_LIST_END',
  GET_START: 'GET_START',
  GET_LOADING: 'GET_LOADING',
  GET_END: 'GET_END',
  UPDATE_START: 'UPDATE_START',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_END: 'UPDATE_END',
  ADD_START: 'ADD_START',
  ADD_LOADING: 'ADD_LOADING',
  ADD_END: 'ADD_END',
  DELETE_START: 'DELETE_START',
  DELETE_LOADING: 'DELETE_LOADING',
  DELETE_END: 'DELETE_END',
  CLEAR: 'CLEAR',
  UPDATE_MSG_SHOW_STATE: 'UPDATE_MSG_SHOW_STATE',
}

const genActionType = (prex)=>{
  let res = {}
  for(let k in commonType){
    res[k] = prex+':'+commonType[k]
  }
  return res
}



export {
  genActionType
}