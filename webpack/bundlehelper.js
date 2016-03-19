/* eslint strict: 0, prefer-const: 1 */
'use strict'
const fs = require('fs')
const util = require('util')
const path = require('path')

const getJsAndCssList = (items) => {
  const resultList = []
  for (let item of items) {
    if (item.name.endsWith('.js') || item.name.endsWith('.css')) {
      resultList.push(item.publicPath)
    }
  }
  return resultList
}

// Prepare a production head tag with the loader script
const loadSkinData = () => {
  const bundleContent = fs.readFileSync(path.resolve(path.join(
    __dirname, '..', 'dist', 'assets', 'stats.json')), 'utf-8')
  const bundleParsed = JSON.parse(bundleContent)
  const vendorPath = getJsAndCssList(bundleParsed.chunks.vendor)[0]
  const defaultPathList = getJsAndCssList(bundleParsed.chunks.default)
  return {
    vendorPath,
    defaultPathList
  }
}

const createCssTag = (filePath) =>
  `<link rel="stylesheet" src="${filePath}">\n`

const createJsTag = (options) => {
  const defer = options.defer ? ' defer' : ''
  return `<script type="text/javascript" src="${options.path}"` +
  `${defer}></script>\n`
}

// const createSettingsTag = (settings) => util.format(
//   '<script type="text/javascript">\nvar __assetData = %j\n</script>\n',
//   settings)

exports.createHeader = () => {
  const skinData = loadSkinData()
  let headerStr = ''
  headerStr += createJsTag({
    path: skinData.vendorPath
  })
  for (let assetPath of skinData.defaultPathList) {
    if (assetPath.endsWith('.css')) {
      headerStr += createCssTag(assetPath)
      continue
    }
    if (assetPath.endsWith('.js')) {
      headerStr += createJsTag({
        path: assetPath,
        defer: true
      })
    }
  }
  return headerStr
}
