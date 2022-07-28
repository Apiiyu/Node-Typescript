import express from 'express'
import config from 'config'
import connection from './utils/connection'
import log from './utils/logger'
import routes from './routes'

const app = express()
const port = config.get<number>('port')

app.use(express.json())

app.listen(port, async () => {
  await connection()
  log.info(`Server already running at http://localhost:${port}`)

  routes(app)
})