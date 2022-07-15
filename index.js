const jsonServer = require('json-server')
const { Web3Storage, File } = require('web3.storage')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cron = require('node-cron')
const web3Token = process.env.WEB3TOKEN

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
function makeStorageClient() {
		return new Web3Storage({ token: web3Token })
	}

cron.schedule('* * * * *', async function () {
const client = makeStorageClient()
	
		const files = [
		new File( ['<DATA>'], 'db.json', {type : 'application/json'})
		]
  cid = await client.put(files)
  console.log('one minute db upload', cid)
})