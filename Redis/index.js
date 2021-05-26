const IORedis = require('ioredis')

// 1 建立连接
const redis = new IORedis({
  port: 6379,
  host: '127.0.0.1'
})

async function getFoo() {
  try {
    const ret = await redis.get('foo')
    console.log(ret)
  } catch (error) {
    console.log('失败')
  }
}

// 2 操作 Redis 
// 写入操作
redis.set('foo', 'barr', (err, ret) => {
  if (err) {
    return console.log('写入失败--', err)
  }
  console.log('写入成功--', ret)
})

// 读取操作 回调函数方式
// redis.get('foo', (err, ret) => {
//   if (err) {
//     return console.log('获取失败--', err)
//   }
//   console.log(ret)
// })

// 读取操作 支持promise的then方式
// redis.get('foo').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log('获取失败--', err)
// })

// async await 简化promise的then方式
getFoo()