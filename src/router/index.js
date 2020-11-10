import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = (resolve) => {
  import('components/recommend').then((module) => {
    resolve(module)
  })
}

const Discovered = (resolve) => {
  import('components/discovered').then((module) => {
    resolve(module)
  })
}

const Message = (resolve) => {
  import('components/message').then((module) => {
    resolve(module)
  })
}
const Messages = (resolve) => {
  import('components/messages').then((module) => {
    resolve(module)
  })
}

const Center = (resolve) => {
  import('components/personalcenter').then((module) => {
    resolve(module)
  })
}

const Search  = (resolve) => {
  import('components/search').then((module) => {
    resolve(module)
  })
}

const Login = (resolve) => {
  import('views/login').then((module) => {
    resolve(module)
  })
}

const ALL = (resolve) => {
  import('views/all').then((module) => {
    resolve(module)
  })
}

const Game = (resolve) => {
  import('views/game').then((module) => {
    resolve(module)
  })
}

const Mature = (resolve) => {
  import('views/mature').then((module) => {
    resolve(module)
  })
}
const Young = (resolve) => {
  import('views/young').then((module) => {
    resolve(module)
  })
}
const Shezhi = (resolve) => {
  import('components/shezhi').then((module) => {
    resolve(module)
  })
}
const publishpage = (resolve) => {
  import('components/publishpage').then((module) => {
    resolve(module)
  })
}
const zhuye = (resolve) => {
  import('components/zhuye').then((module) => {
    resolve(module)
  })
}
const realnamepage = (resolve) => {
  import('components/realnamepage').then((module) => {
    resolve(module)
  })
}

const bianji = (resolve) => {
  import('components/bianji').then((module) => {
    resolve(module)
  })
}

const Faxian = (resolve) => {
  import('components/faxian').then((module) => {
    resolve(module)
  })
}
const newkonjian = (resolve) => {
  import('components/newkonjian').then((module) => {
    resolve(module)
  })
}
const offlineActivity = (resolve) => {
import('components/offlineActivity').then((module) => {
  resolve(module)
})
}
const changepassword = (resolve) => {
  import('components/changepassword').then((module) => {
    resolve(module)
  })
  }
  const  messagety = (resolve) => {
    import('components/message/messagety').then((module) => {
      resolve(module)
    })
    }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend/all',
      meta: {keepAlive: true }
    },
    {
      path: '/Login',
      component: Login,
      meta: {keepAlive: true }
    },
    {
      path: '/recommend',
      redirect: '/recommend/all',
      component: Recommend,
      meta: {keepAlive: true },
      children: [
        {
          path: '/recommend/game',
          component: Game,
          meta: {keepAlive: true }
        },
        {
          path: '/recommend/all',
          component: ALL,
          meta: {keepAlive: true }
        },
        {
          path: '/recommend/mature',
          component: Mature,
          meta: {keepAlive: true }
        },
        {
          path: '/recommend/young',
          component: Young,
          meta: {keepAlive: true }
        },
      ]

    },
    {
      path: '/message',
      component: Message,
      meta: {keepAlive: true },
      children: [
        {
          path: ':id',
          component: Messages,
          meta: {keepAlive: true }
        }
      ]
    },
    {
      path: '/publishpage',
      component: publishpage,
      meta: {keepAlive: true },
    },
    {
      path: '/center',
      component: Center,
      meta: {keepAlive: true },
    },
    {
      path: '/center/shezhi',
      component: Shezhi,
      meta: {keepAlive: false }
    },
    {
      path: '/zhuye',
      component: zhuye,
      meta: {keepAlive: true },
      children: [
        {
          path: ':id',
          component: Discovered,
          meta: {keepAlive: false },
        }
      ]
    },
    {
      path: '/Faxian',
      component: Faxian,
      meta: {keepAlive: true },
    },
    {
      path: '/search',
      component: Search,
      meta: {keepAlive: true },
    },
    {
      path: '/kongjian',
      component: Discovered,
      meta: {keepAlive: true },
    },
    {
      path: '/center/bianji',
      component: bianji,
      meta: {keepAlive: true },
    },
    {
      path: '/realnamepage',
      component:  realnamepage,

    },
    {
      path: '/newkonjian',
      component:  newkonjian,

    },
    {
      path: '/offlineActivity',
      component:  offlineActivity,

    },
    {
      path: '/changepassword',
      component:  changepassword,

    },
    {
      path: '/messagety',
      component:  messagety,

    },
  ]
})
