const { MongoClient, ObjectId } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017', {
  useUnifiedTopology: true
})

async function run() {
  try {

    // 开始连接
    await client.connect()
    const testDb = client.db('test')
    const usersCollection = testDb.collection('users')

    // 查找
    // const userCollection = testDb.collection('users')
    // const ret = await userCollection.find()

    // 插入文档
    // const ret = await usersCollection.insertOne({
    //   a: 1,
    //   b: '2',
    //   c: true,
    //   d: [1, 2, 3]
    // })
    // console.log('ret----', ret)

    // 删除
    // const ret = await usersCollection.deleteOne({
    //   _id: ObjectId('60acaf982bf94d5fac515fd0')
    // })
    // console.log(ret)

    // 更新
    await usersCollection.updateOne({
      _id: ObjectId('60ac93e70e7a8f7eaec3ce21'),
    }, {
      $set: {
        age: 18
      }
    })

  } catch (error) {
    console.log('连接失败----', error)
  }
}
run()