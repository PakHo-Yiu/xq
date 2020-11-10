import store from '@/store'
export default class Rmessage {
    constructor({username,recontact,img,nickName}) {
      this.username = username
      this.recontact = recontact
      this.img = img
      this.nickName=nickName
    }
  }
  export function createRmessage(Data) {
     return  new Rmessage({          
        username : Data.newusername,
        recontact: Data.username,
        img: Data.img,
        nickName: Data.nickName,
     })
  }
  export function createRmessages(Data) {
   return  new Rmessage({          
      username : store.state.user.username,
      recontact: Data.username,
      img: Data.img,
      nickName: Data.nickName,
   })
}