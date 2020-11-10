import messageComponent from './messagety.vue'
const messagety = {
  install: function (Vue) {
    // 创建一个Vue的“子类”组件
    const messageConstructor = Vue.extend(messageComponent)

    // 创建一个该子类的实例,并挂载到一个元素上
    const instance = new messageConstructor()

    // 将这个实例挂载到动态创建的元素上,并将元素添加到全局结构中
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 在Vue的原型链上注册方法，控制组件
    Vue.prototype.$message = (state = 'loading', msg,duration = 1500) => {
      instance.state = state
      instance.message = msg
      instance.visible = true

      setTimeout(() => {
        instance.visible = false
      }, duration)
    }
  }
}
export default messagety