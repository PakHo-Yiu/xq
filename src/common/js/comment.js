import store from '@/store'
import Vue from 'vue'
export default class Comment {
    constructor({type,s_id,content,time,username,recontact,username_zy,img,nickName,s_content,s_back,nickNames}) {
      this.type = type
      this.S_Id = s_id
      this.c_content = content
      this.c_createTime=time
      this.c_username=username
      this.recontact=recontact
      this.username_zy=username_zy
      this.img=img
      this.nickName=nickName
      this.s_content=s_content
      this.s_back=s_back
      this.nickNames=nickNames
    }
  }

  export function createComment(Data) {
    if(!store.state.user.konjian[store.state.user.username_zy]){
      Vue.set(store.state.user.konjian,store.state.user.username_zy, []);
    }
  
    store.state.user.konjian[store.state.user.username_zy].push(
      new Comment({          
      type : Data.type,
      s_id : Data.s_id,
      content : Data.content,
      time : Data.time,
      username : Data.username,
      recontact : Data.recontact,
      username_zy:Data.username_zy,
      img : Data.img,
      nickName : Data.nickName,
      s_back : Data.s_back,
      s_content : Data.s_content,
      nickNames : Data.nickNames

     }))
     return  new Comment({          
      type : Data.type,
      s_id : Data.s_id,
      content : Data.content,
      time : Data.time,
      username : Data.username,
      recontact : Data.recontact,
      username_zy:Data.username_zy,
      img : Data.img,
      nickName : Data.nickName,
      s_back : Data.s_back,
      s_content : Data.s_content,
      nickNames : Data.nickNames
     })
  }
  export function createComments(Data) {
     return  new Comment({          
      type : Data.type,
      s_id : Data.s_id,
      content : Data.content,
      time : Data.time,
      username : Data.username,
      recontact : Data.recontact,
      username_zy:Data.username_zy,
      img : Data.img,
      nickName : Data.nickName,
      s_back : Data.s_back,
      s_content : Data.s_content,
      nickNames : Data.nickNames
     })
  }
  export function createRComment(Data) {
  
    if(!store.state.user.konjian[Data.username_zy]){
      Vue.set(store.state.user.konjian,Data.username_zy, []);
    }
    if(!store.state.user.konjian[Data.recontact]){
      Vue.set(store.state.user.konjian,Data.recontact, []);
    }
    store.state.user.konjian[Data.username_zy].push(
      new Comment({          
      type : Data.type,
      s_id : Data.S_Id,
      content : Data.c_content,
      time : Data.c_createTime,
      username : Data.c_username,
      recontact : Data.recontact,
      username_zy : Data.username_zy,
      img : Data.img,
      nickName : Data.nickName,
      s_back : Data.s_back,
      s_content : Data.s_content,
      nickNames : Data.nickNames
      
     }))
     if(Data.username_zy!=Data.recontact){
      store.state.user.konjian[Data.recontact].push(
        new Comment({          
        type : Data.type,
        s_id : Data.S_Id,
        content : Data.c_content,
        time : Data.c_createTime,
        username : Data.c_username,
        recontact : Data.recontact,
        username_zy : Data.username_zy,
        img : Data.img,
        nickName : Data.nickName,
        s_back : Data.s_back,
        s_content : Data.s_content,
        nickNames : Data.nickNames
        
       }))
     }
     
     

  }


  export function createRCommentF(Data) {
    if(!store.state.user.konjian[Data.username_zy]){
      Vue.set(store.state.user.konjian,Data.username_zy, []);
    }
    store.state.user.konjian[Data.username_zy].push(
      new Comment({          
      type : Data.type,
      s_id : Data.S_Id,
      content : Data.c_content,
      time : Data.c_createTime,
      username : Data.c_username,
      recontact : Data.recontact,
      username_zy : Data.username_zy,
      img : Data.img,
      nickName : Data.nickName,
      s_back : Data.s_back,
      s_content : Data.s_content,
      nickNames : Data.nickNames
      
     }))
  }