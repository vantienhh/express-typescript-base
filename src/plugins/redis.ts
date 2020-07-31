import redis from 'redis'

let redisClient = redis.createClient({
  port: 6379,               // replace with your port
  host: '120.0.0.1',        // replace with your hostanme or IP address
  password: 'your password',    // replace with your password
  // optional, if using SSL
  // use `fs.readFile[Sync]` or another method to bring these values in
  // tls: {
  //   key: stringValueOfKeyFile,
  //   cert: stringValueOfCertFile,
  //   ca: [stringValueOfCaCertFile],
  // },
})

redisClient.on('connect', function () {
  console.log('Redis client connected')
})
redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err)
})

export default redisClient
