const axios = require('axios')
const exec = require('child_process').exec

const settings = require('./settings')

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error)
      resolve(stdout)
    })
  })
}

function getIp() {
  const reg = /ppp0.*\s.*inet[ ](\d+\.\d+\.\d+\.\d+)/
  return execute('ifconfig').then((output) => reg.exec(output)[1])
}

function dial() {
  return execute('adsl-stop;adsl-start')
}

async function testProxy(host, port) {
  const res = await axios.get('https://www.baidu.com', {
    proxy: {
      host: host,
      port: port,
      auth: {
        username: settings.proxyUsername,
        password: settings.proxyPassword
      }
    },
    timeout: 5000
  })
  if (res.status !== 200) return Promise.reject()
}

async function waitBeforeDial() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, settings.waitTimeBeforeDail)
  })
}

module.exports = {
  getIp,
  dial,
  testProxy,
  waitBeforeDial
}
