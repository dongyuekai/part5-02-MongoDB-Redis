const IORedis = require('ioredis')

// 1 建立连接
const redis = new IORedis({
  port: 6379,
  host: '127.0.0.1'
})

// 事务操作
async function main() {
  try {
    // 开启事务
    const ret = await redis
      .multi()
      .set('jack', 100)
      .set('rose', 200)
      .exec()
    console.log(ret)

  } catch (error) {

  }
}
main()