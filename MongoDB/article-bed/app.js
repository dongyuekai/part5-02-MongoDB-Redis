const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')

const connectUri = 'mongodb://localhost:27017'
const dbClient = new MongoClient(connectUri)

const app = express()

// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到req.body中
// 在使用之前挂载这个中间件
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

// 创建文章API
app.post('/articles', async (req, res, next) => {
  try {
    // 1. 获取客户端表单数据
    const { article } = req.body

    // 2. 数据验证
    if (!article || !article.title || !article.description || !article.body) {
      return res.status(422).json({
        error: '请求参数不符合规则要求'
      })
    }

    // 3. 把验证通过的数据插入数据库中
    //    成功 -> 发送成功响应
    //    失败 -> 发送失败响应
    await dbClient.connect()

    const collection = dbClient.db('test').collection('articles')

    article.createdAt = new Date()
    article.updatedAt = new Date()
    const ret = await collection.insertOne(article)

    article._id = ret.insertedId

    res.status(201).json({
      article
    })
  } catch (err) {
    // 由错误处理中间件统一处理
    next(err)
    // res.status(500).json({
    //   error: err.message
    // })
  }
})

// 错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})


app.listen(3000, () => {
  console.log('app server running at port 3000...')
})