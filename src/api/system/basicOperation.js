import service from '@/api/index'
// 用户注册接口
export const register = (params) => {
  return service.post('/user/Login/register', params)
}
// 用户登录接口
export const login = (params) => {
  return service.post('/user/Login/login', params)
}
// 用户注销接口
export const logout = (params) => {
  return service.post('servepc/sysUser/logout', params)
}
//用户信息初始化
export const initDate =(params)=>{
  return service.post('/user/User/getuser',params)
}
//用户信息更新
export const update = (params)=>{
  return service.post('/user/User/update',params)
}
//上传图片
export const updates = (params)=>{
  return service.post('/user/User/updates',params, {
    headers: {
        'Content-Type': false
    }
  })
  
}


//获取最近聊天列表
export const getrmessage = (params)=>{
  return service.post('/user/User/getrmessage',params)
}

//获取其他用户信息
export const initDates =(params)=>{
  return service.post('/user/User/getuser',params)
}
//获取其他用户信息
export const getUserByUserName =(params)=>{
  return service.post('/user/User/getByName',params)
}
//获取其他用户个人空间信息
export const getUserSaything =(params)=>{
  return service.post('/user/User/getsay',params)
}
//获取广场信息
export const getsquare =(params)=>{
  return service.post('/user/User/getsquare',params)
}
//搜索其他用户
export const getsearch =(params)=>{
  return service.post('/user/User/getsearch',params)
}

//根据登录用户的信息推送合适的相亲用户
export const getblinddate =(params)=>{
  return service.post('/user/User/getblinddate',params)
}
//发表空间心情
export const insaything =(params)=>{
  return service.post('/user/User/insaything',params)
}

//新建聊天
export const newtalllist =(params)=>{
  return service.post('/user/User/newtalllist',params)
}

//删除聊天
export const deletermessage =(params)=>{
  return service.post('/user/User/deletermessage',params)
}

//用户新登录时加载新消息列表
export const getnewmessage =(params)=>{
  return service.post('/user/User/getnewmessage',params)
}
//用户新登录时加载新消息列表
export const setnewmessage =(params)=>{
  return service.post('/user/User/setnewmessage',params)
}

export const initDatemessage =(params)=>{
  return service.post('user/User/initDatemessage',params)
}

//用户更改密码
export const changepassword =(params)=>{
  return service.post('/user/User/changepassword',params)
}
//用户更改密码
export const SignUp =(params)=>{
  return service.post('/user/User/SignUp',params)
}
//加载用户聊天数据
export const getallmessage =(params)=>{
  return service.post('/user/User/getallmessage',params)
}
