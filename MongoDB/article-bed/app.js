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

app.post('/articles', (req, res) => {
  console.log('req.body---', req.body)
  res.send('返回值---- post /articles')
})



app.listen(3000, () => {
  console.log('app server running at port 3000...')
})