const express = require('express');
import { Request, Response } from 'express';
import checkDiskSpace from 'check-disk-space'
/*
iptables -I INPUT -p tcp -s 0.0.0.0 --dport 4445 -j ACCEPT
iptables -I INPUT -p tcp -s 0.0.0.0/0 --dport 4445 -j DROP
*/
const startServer = () => {
	const app = express()
	const port = 4445
	app.get('/disk', async (req: Request, res: Response) => {
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