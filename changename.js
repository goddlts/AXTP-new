const fs = require('fs')
const path = require('path')

const vueName = 'depart.vue.backup'
const saveName = 'depart.vue'

let vueFilePath = 'src/views/baseinfo/' + vueName

vueFilePath = path.join(__dirname, vueFilePath)

fs.readFile(vueFilePath, 'utf-8', (err, data) => {
  // 正则表达式
  const reg = /[a-z]+(\_[a-z]+){1}/g
  const values = data.match(reg)
  values.forEach(v => {
    if (!v.startsWith('s_') && !v.endsWith('_id')) {
      const camelName = toCamelName(v)
      data = data.replace(new RegExp(`${v}`, 'g'), camelName)
    }

    if (v.endsWith('_id')) {
      let camelName = toCamelName(v)
      camelName = camelName.replace('Id', 'Name')
      data = data.replace(new RegExp(`${v}`, 'g'), camelName)
    }
  })

  const saveFilePath = path.join(__dirname, 'src/views/baseinfo/', saveName)
  fs.writeFile(saveFilePath, data, (err) => {
    console.log(err)
  })
})

/**
 * @summary 下划线命名转换驼峰命名法
 * @param { String } v 要转换的值
 * @returns { String } 驼峰命名的值
 */
function toCamelName (v) {
  const arr = v.split('_')
  let result = arr[0]
  for(let i = 1; i < arr.length; i++) {
    const item = arr[i]
    result += item[0].toUpperCase() + item.substr(1)
  }
  return result
}