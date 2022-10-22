module.export = {
  redisKey: 'adsl', // redis数据库hash键名
  redisHost: '', // redis主机名
  redisPort: 6379, // redis端口号
  redisPassword: '', // redis密码
  proxyPort: 8088, // 代理端口
  waitTimeBeforeDail: 5000, // 从代理从数据库中移除，到重新拨号等待时间间隔
  id: 'adsl1', // 当前机器id
  peerId: 'adsl2' // 另一台机器id
}
