require('dotenv').config()

import App from '@/app'

const app = new App().express

const port = process.env.PORT || 3000
app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
