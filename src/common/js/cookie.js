import Cookies from 'js-cookie'
const TokenKey = 'Token'
const expiresTime =7
export function getToken() {
  return Cookies.get('Token')
}

export function setToken(token) {
  return Cookies.set('Token', token,{ expires: expiresTime })
}

export function removeToken() {
  return Cookies.remove('Token')
}


export function getUsername() {
  return Cookies.get('username')
}


export function setUsername(token) {
  return Cookies.set('username', token,{ expires: expiresTime })
}

export function removeUsername() {
  return Cookies.remove('username')
}
export function getUsernamet() {
  return Cookies.get('usernamet')
}

export function setUsernamet(token) {
  return Cookies.set('usernamet', token,{ expires: expiresTime })
}

export function removeUsernamet() {
  return Cookies.remove('usernamet')
}
export function getsearchlist(){
  return Cookies.get('searchlist',[])
}

export default class Picture {
  constructor({src,file}) {
    this.src= src
    this.file=file
  }
}
export function createPicture(Data,file) {
  return new Picture({          
    src: Data,
    file:file
  })
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(value) {
  Cookies.set('searchlist',value)
}

// export function deleteSearch(value) {
//   let searchlist = Cookies.get('searchlish', [])
//   deleteFromArray(searchlist, (item) => {
//     return item === value
//   })
//   Cookies.set('searchlist',searchlist)
//   return searchlist
// }

// export function clearSearch() {
//   storage.remove('searchlist')
//   return []
// }