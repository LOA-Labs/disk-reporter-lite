const express = require('express');
import { Request, Response } from 'express';
import checkDiskSpace from 'check-disk-space'
/*
iptables -I INPUT -p tcp -s 0.0.0.0/0 --dport 4445 -j DROP
iptables -I INPUT -p tcp -s 0.0.0.0 --dport 4445 -j ACCEPT
iptables -I INPUT -p tcp -s 167.99.56.130 --dport 4445 -j ACCEPT
screen -R drl
git clone https://github.com/LOA-Labs/disk-reporter-lite.git
cd disk-reporter-lite/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
..b
nvm install v17.8.0
npm i
npm run start
*/

const startServer = () => {
	const app = express()
	const port = 4445
	app.get('/disk', async (req: Request, res: Response) => {
		console.log('req from', req.remote_ip)
		try {
			let diskSpace: any = await checkDiskSpace(req.query.disk)
			diskSpace.percent = Math.ceil((diskSpace.size - diskSpace.free) / diskSpace.size * 100).toString()
			res.send(diskSpace);
		} catch (e) {
			res.sendStatus(500)
		}
	})

	app.listen(port, () => {
		console.log(`\n=========\nDisk reporter listing on port ${port}`)
	})
}

startServer()