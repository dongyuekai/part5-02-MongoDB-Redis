const IORedis = require('ioredis')

// 1 建立连接
const redis = new IORedis({
  port: 6379,
  host: '127.0.0.1'
})

// 批量写入 通过管道机制 pipeline
async function setFoo() {
  try {
    // 通过管道
    const pipeline = redis.pipeline()
    for (let i = 0; i < 100; i++) {
      pipeline.set(`${i}-foo`, i)
    }
    // 执行
    const ret = await pipeline.exec()
    console.log(ret)
  } catch (error) {
    console.log('失败')
  }
}
setFoo()