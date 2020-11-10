import storage from 'good-storage'
import store from '@/store'
import {createRmessage} from '@/common/js/rmessage.js'
const SEARCH_KEY = 'searchlist'
const SEARCH_MAX_LEN = 10
const Browsing_KEY ='Browsinglist'
const Attention_KEY = 'attentionlist'
const Rmessage_KEY ='rmessage_list'
const User_key ='user'
export function loadattention(){
  return storage.get(Attention_KEY,[])
}

export function loadUser(){
  return storage.get(User_key)
}
export function saveUser(userlist){
  store.commit('SET_USER',userlist);
  storage.set(User_key, userlist);
}
export function clearattention(){
  storage.remove(Attention_KEY)
  store.commit('SET_ATTENTIONLISH',[])
}

export function saveattention(query) {
  let attentions = storage.get(Attention_KEY,[])
  insertArray(attentions, query, (item) => {
    return item.username === query.username
  })
  storage.set(Attention_KEY, attentions)
  store.commit('SET_ATTENTIONLISH',attentions)
  return attentions
}
export function deleteattention(query) {
  let attentions = storage.get(Attention_KEY,[])
  deleteFromArray(attentions, (item) => {
    return item.username === query.username
  })
  storage.set(Attention_KEY, attentions)
  store.commit('SET_ATTENTIONLISH',attentions)
  return attentions
}

export function clearBrowsing(){
  storage.remove(Browsing_KEY)
  store.commit('SET_BROWSINGLISH',[])
  return []
}
export function loadbrowsing(){
  return storage.get(Browsing_KEY, [])
}
export function saveBrowsing(query) {
  let Browsings = storage.get(Browsing_KEY, [])
  insertArray(Browsings, query, (item) => {
    return item.username === query.username
  })
  storage.set(Browsing_KEY, Browsings)
  store.commit('SET_BROWSINGLISH',Browsings)
  return Browsings
}

export function deleteBrowsing(query) {
  let Browsings = storage.get(Browsing_KEY, [])
  deleteFromArray(Browsings, (item) => {
    return item.username === query.username
  })
  storage.set(Browsing_KEY, Browsings)
  store.commit('SET_BROWSINGLISH',Browsings)
  return Browsings
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    store.commit('SET_SEARCHLISH',[])
    return []
  }
  
  export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
  }
  export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, (item) => {
      return item === query
    }, SEARCH_MAX_LEN)
    storage.set(SEARCH_KEY, searches)
    store.commit('SET_SEARCHLISH',searches)
    return searches
  }
  
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, (item) => {
      return item === query
    })
    storage.set(SEARCH_KEY, searches)
    store.commit('SET_SEARCHLISH',searches)
    return searches
  }
  function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
      arr.splice(index, 1)
    }
  }
  function insertArray(arr, val, compare, maxLen=0) {
    const index = arr.findIndex(compare)
    if (index === 0) {
      return true
    }
    if (index > 0) {
      arr.splice(index, 1)
    }
    arr.unshift(val)
       return false
    if (maxLen && arr.length > maxLen) {
      arr.pop()
    }
  }

  function insertArrays(arr, val, compare, maxLen=0) {
    const index = arr.findIndex(compare)
    if (index >= 0) {
      return false
    }
    arr.unshift(val)
       return false
  }

  export default class List {
    constructor({username,img,nickName,time}) {
      this.username=username
      this.img=img
      this.nickName=nickName
      this.time=time
    }
  }
  export function createList(username,img,nickName) {
    var time =new Date().getTime().toString().slice(0,-3);
    return new List({          
      username: username,
      img:img,
      nickName:nickName,
      time:time
    })
  }


  export function setwebsock(websock) {
    return storage.set('websock',websock)
  }
  export function getwebsock() {
    return storage.get('websock')
  }

  // export function getuserrmessage(){
  //   return storage.get(Rmessage_KEY,{})
  // }
  // export function clearattention(){
  //   storage.remove(Rmessage_KEY)
  //   store.commit('SET_ATTENTIONLISH',{})
  // }
  
  export function savermessage(query) {
      if( insertArrays(store.state.user.rmessage_list, query, (item) => {
        return item.recontact === query.username
      })==false){
        return createRmessage(query)
      }else{
        return false;
      }
  }
  export function deletermessage(query) {
    deleteFromArray(store.state.user.rmessage_list, (item) => {
      return item.recontact === query.recontact
    })
  }