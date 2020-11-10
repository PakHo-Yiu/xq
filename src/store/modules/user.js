import { basicOp } from '@/api/index.js'
import { getToken, setToken, removeToken,setUsername,getUsername,setUsernamet,removeUsername} from '@/common/js/cookie.js'
import {create} from '@/common/js/sd.js'
import {loadSearch,loadbrowsing,loadattention,setwebsock,savermessage,loadUser} from '@/common/js/storage.js'
import {createNMessage,initMessage} from '@/common/js/fanfa.js'
const user = {
  state: {
    token: getToken(),
    key: 0,
    xinxi: {},
    konjian: {},
    chat:{},
    username:getUsername(),
    user:loadUser(),
    username_zy:'',
    websock:'',
    searchlist: loadSearch(),
    browsing_history:loadbrowsing(),
    attention_list:loadattention(),
    rmessage_list:[],
    newmessage:{},
    newmessagen:0,
  },
  mutations: {   
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NEWMESSAGEN: (state, newmessagen) => {
      state.newmessagen = newmessagen
    },
    SET_RMESSAGELIST: (state, rmessage_list) => {
      state.rmessage_list = rmessage_list
    },
    SET_ATTENTIONLISH: (state, attention_list) => {
      state.attention_list = attention_list
    },
    SET_BROWSINGLISH: (state, browsing_history) => {
      state.browsing_history = browsing_history
    },
    SET_USERNAMEZY: (state, username_zy) => {
      state.username_zy = username_zy
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      setUsername(username)
    },
    SET_CHAT: (state, chat) => {
      state.chat = chat
      setUsernamet(chat)
    },
    SET_KEY: (state, key) => {
      state.key = key
    },
    SET_XINXI: (state, xinxi) => {
      state.xinxi = xinxi
    },
    SET_KONJIAN: (state, konjian) => {
      state.konjian = konjian
    },
    SET_NEWMESSAGE: (state, newmessage) => {
      state.newmessage = newmessage
    },
    SAVE_WEBSOCKETS: (state) => {
      setwebsock(state.websock)
    },
    SET_SEARCHLISH: (state,searchlist) => {
      state.searchlist = searchlist
    },
    SET_WEBSOCKET: (state, websock) => {
      state.websock = websock
      state.websock.onopen = function () {
        //连接建立之后执行send方法发送数据
        state.websock.send(JSON.stringify({
            type:'first',
            username:state.username
        }
        )); 
    }
    state.websock.onmessage = function (e) {
      //接收数据
      create(e.data);
    console.log(e.data)
  }
      //连接建立之后执行send方法发送数据
      
   state.websock.onerror = function (e) {

    dispatch('SET_WEBSOCKETS');
}
state.websock.onclose = function (e) {

  dispatch('SET_WEBSOCKETS');
  
}
    },
  },

  actions: {
    // 保存token
    LoginByUsername({ commit }, userInfo) {
          commit('SET_TOKEN',userInfo)
          setToken(userInfo)
  

    },
    SET_WEBSOCKETS({ commit }) {
       const wsuri = "ws://"+document.domain+":8282";
       commit('SET_WEBSOCKET',new WebSocket(wsuri))
       
 },
 SAVE_WEBSOCKETS({ commit }) {
  commit('SAVE_WEBSOCKETS')
},

Newrmessage({ commit },chat) {
  let values =savermessage(chat)
  commit('SET_CHAT',values)
  if(values){
      basicOp.newtalllist(values).then(res => {
             }).catch(res => {
       })
   }
},

Newmessage({ commit },list) {
 
  createNMessage(list)
},
Allmessage({ commit },list) {
 
  initMessage(list)
},

    // 保存用户信息
    GetUserInfo({ commit, state }) {
          commit('SET_KEY', 1)
          commit('SET_XINXI', data.xinxi)
        
      
    },
    // 前端 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', 'undefind')
        commit('SET_KEY',0)
        removeUsername()
        removeToken()
        resolve()
      })
    },
  }
}

export default user
