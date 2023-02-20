import { observe } from './observe/index'

// 功能：对数据进行劫持
export function initState(vm) {
  const opts = vm.$options // 获取所有的选项
  if (opts.data) {
    initData(vm)
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key]
    },
    set(newValue) {
      vm[target][key] = newValue
    }
  })
}

function initData(vm) {
  let data = vm.$options.data // data 可能是函数和对象 =》 根实例data可能是函数或对象  组件中data必须是函数
  data = typeof data === 'function' ? data.call(vm) : data // data是用户返回的对象

  vm._data = data // 我将返回的对象放到了_data上
  // 对数据进行劫持 vue2里 采用了一个api defineProperty
  observe(data)

  // 将vm._data 用 vm 来代理就行了
  for (let key in data) {
    proxy(vm, '_data', key)
  }
}
