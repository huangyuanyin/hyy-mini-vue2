class Observer {
  constructor(data) {
    // Object.defineProperty只能劫持已经存在的属性（vue里面会为此单独写一些api：$set $delete）
    this.walk(data)
  }
  // 功能：循环对象，对属性依次劫持
  walk(data) {
    // "重新定义" 属性 性能差
    Object.keys(data).forEach((key) => defineReactive(data, key, data[key]))
  }
}

export function defineReactive(target, key, value) {
  // value：可能是个对象
  observe(value) // 对所有的对象都进行数据劫持
  // 闭包 属性劫持
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return
      value = newValue
    }
  })
}

export function observe(data) {
  // 对这个对象进行劫持
  if (typeof data !== 'object' || data == null) {
    return // 只对对象进行劫持
  }
  // 如果一个对象被劫持过了，那就不需要再被劫持了（要判断一个对象是否被劫持过，可以增添一个实例，用实例来判断是否被劫持过）
  return new Observer(data)
}
