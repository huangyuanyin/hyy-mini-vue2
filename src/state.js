// 功能：对数据进行劫持
export function initState(vm) {
  const opts = vm.$options // 获取所有的选项
  if (opts.data) {
    initData(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data // data 可能是函数和对象 =》 根实例data可能是函数或对象  组件中data必须是函数
  data = typeof data === 'function' ? data.call(vm) : data
  console.log(`output->data`, data)
}
