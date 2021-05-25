const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/articles', (req, res) => {
  res.send('返回值---- post /articles')
})



app.listen(3000, () => {
  console.log('app server running at port 3000...')
})