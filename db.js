const redis = require('redis')
const settings = require('./settings')

const client = redis.createClient({
  socket: {
    host: settings.redisHost,
    port: settings.redisPort
  },
  password: settings.redisPassword
})

exports.remove = async () => {
  await client.connect()
  await client.hDel(settings.redisKey, settings.id)
  return client.quit()
}

exports.set = async (ip) => {
  await client.connect()
  await client.hSet(settings.redisKey, settings.id, ip)
  return client.quit()
}
