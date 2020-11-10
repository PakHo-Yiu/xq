import store from '@/store'
import Vue from 'vue'
import router from "@/router";
import { basicOp } from '@/api/index.js'
import {createRmessages} from '@/common/js/rmessage.js'
  export default class Message {
    constructor({type, content,time,opentime,img,username,nickName}) {
      this.type = type
      this.content = content
      this.time=time
      this.opentime=opentime
      this.img=img
      this.username=username
      this.nickName=nickName
    }
  }
  export function deepClone(obj) {
    let _obj = JSON.stringify(obj);
    let objClone = JSON.parse(_obj);
    return objClone;
  }
  export function createMessage(Data) {

    var username = Data.recontact
    if(!store.state.user.xinxi[username]){
      Vue.set(store.state.user.xinxi,username, []);
    }
    store.state.user.xinxi[username].push(new Message({          
      type: 'send',
      content: Data.content,
      time: Data.time,
      opentime: Data.opentime,
      img: Data.img,
      username: Data.username,
      nickName: Data.nickName
    }))
  } 
  export function createRMessage(Data) {
    var username = Data.username
    if(!store.state.user.xinxi[Data.username]){
      Vue.set(store.state.user.xinxi,Data.username, []);
    }
    store.state.user.xinxi[Data.username].push(new Message({          
      type: 'receive',
      content:Data.content,
      time: Data.time,
      opentime: Data.opentime,
      img: Data.img,
      username:Data.username,
      nickName:Data.nickName
    }))
   if(router.currentRoute.path==("/message/"+username) ){
     return
   }
    if(!store.state.user.newmessage[username]){
      Vue.set(store.state.user.newmessage,username, 0);
    }
    if(Data.types==1){
      insertArrays(store.state.user.rmessage_list, Data, (item) => {
        return item.recontact === Data.username
      })
      ++store.state.user.newmessagen
      ++store.state.user.newmessage[username]
    }

  }
  export function initRMessage(Data) {
    if(!store.state.user.xinxi[Data.username]){
      Vue.set(store.state.user.xinxi,Data.username, []);
    }
    store.state.user.xinxi[Data.username].push(new Message({          
      type: 'receive',
      content:Data.content,
      time: Data.time,
      opentime: Data.opentime,
      img: Data.img,
      username:Data.username,
      nickName:Data.nickName
    }))
  }
  export function createnewMessage(Data) {
    if(!store.state.user.newmessage[Data.username]){
      Vue.set(store.state.user.newmessage,Data.username, 0);
    }
      ++store.state.user.newmessagen
      ++store.state.user.newmessage[Data.username]
  }

  export function initMessage(Date){
    Date.forEach(item => {
      if(item.username==store.state.user.username){
        createMessage(item)
      }else{
        initRMessage(item)
      }
    })
  }
  export function createNMessage(Date){
    Date.forEach(item => {
      createnewMessage(item)
    })
  }
  export function clearzero(username){
    store.state.user.newmessagen=store.state.user.newmessagen-store.state.user.newmessage[username];
    store.state.user.newmessage[username]=0;
  }
  function insertArrays(arr, val, compare, maxLen=0) {
    const index = arr.findIndex(compare)
    if (index < 0) {
       arr.unshift(createRmessages(val))
        basicOp.newtalllist(createRmessages(val)).then(res => {
               }).catch(res => {
         })
         return;
    }
    if (index === 0) {
          return;
        }
    if(index > 0){
      arr.splice(index, 1)
      arr.unshift(createRmessages(val))
     return;
    }
  }