import babel from 'rollup-plugin-babel'
// rollup默认可以导出一个对象，作为打包的配置文件
export default {
  input: './src/index.js', // 入口
  output: {
    file: './dist/vue.js', // 出口
    name: 'Vue', // global.Vue
    format: 'umd', // 打包格式 ： esm es6 commonjs模块  iife自执行函数  umd统一模块规范(兼容amd和commonjs)
    sourcemap: true // 希望可以调试源代码
  },
  Plugins: [
    babel({
      exclude: 'node_modules/**' // 排除node_modules所有文件
    })
  ]
}
