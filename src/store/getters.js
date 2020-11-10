const getters = {
    token: state => state.user.toke,
    key: state => state.user.key,
    websock: state =>state.user.websock,
    chat (state) {
        return state.user.chat
    }
  }
  export default getters