// import 'tsconfig-paths/register'
// import 'module-alias/register'
import config from 'config'
import http from 'http'
import app from './app'
import { logger } from '@utils/logger'
const start = async () => {
  const PORT = config.get<number>('port')
  try {
    // await connectToDB()
    const server = http.createServer(app)
    server.listen(PORT, () => {
      logger.info(`server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error(error)
  }
}
start()
// uncomment to use cluster
// if (cluster.isPrimary) {
//   for (let i = 0; i < os.cpus().length; i++) {
//     /* making child process */
//     cluster.fork()
//   }
//   /* make new instance if server is crashed */
//   cluster.on("exit", () => {
//     cluster.fork()
//   })
// } else {
// start()
//   )
// }
