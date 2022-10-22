const axios = require('axios')
const express = require('express')

const service = require('./service')
const logger = require('./logger')
const db = require('./db')
const settings = require('./settings')

const id = settings.id
const peerId = settings.peerId

const app = express()
const port = 3000
app.listen(port, '0.0.0.0', () =>
  logger.info(`Server ${id} listening on port ${port}!`)
)

let startTime, endTime, avgTime

async function run(peerIp) {
  try {
    logger.info('从数据库中移除当前代理...')
    await db.remove()
    logger.info('成功从数据库移除代理!')

    if (startTime !== undefined) {
      endTime = Date.now()
      let seconds = (endTime - startTime) / 1000
      avgTime = avgTime === undefined ? seconds : avgTime * 0.8 + seconds * 0.2
      logger.info(`代理使用时间${seconds}秒, 平均代理使用时间${avgTime}`)
    }

    logger.info('等待当前代理已完全停止使用...')
    await service.waitBeforeDial()

    logger.info('开始拨号...')
    await service.dial()
    logger.info('拨号成功!')

    logger.info('开始获取IP...')
    const ip = await service.getIp()
    logger.info('获取IP成功!')

    logger.info('开始检查代理可用性...')
    await service.testProxy(ip, settings.proxyPort)
    logger.info(`ip: ${ip} 可用!`)

    logger.info('开始向数据库中插入IP...')
    await db.set(ip)
    startTime = Date.now()
    logger.info(`向数据库插入IP成功!`)

    logger.info(`开始通知${peerId}拨号...`)
    const response = await axios.get('http://' + peerIp + ':3000/dial')
    if (response.data === 'OK') logger.info(`成功通知服务器${peerId}拨号!`)
  } catch (error) {
    logger.warn(`遇到错误: ${error}`)
    logger.info('开始重试...')
    run(peerIp)
  }
}

async function dial(req, res) {
  const peerIp = req.ip
  res.send('OK')
  run(peerIp)
}

app.get('/dial', dial)
