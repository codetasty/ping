const http = require('http');
const childProcess = require('child_process');
const port = 3000;

const requestHandler = (request, response) => {
	response.writeHead(200, {'Content-Type': 'application/json'});
	
	// check if service is running
	childProcess.exec('ps -ef | grep "node/bin/workspaces" | grep -v grep', (err, stdout, stderr) => {
		response.end(JSON.stringify({
			status: 'success',
			service: stdout ? 'active' : 'inactive',
		}));
	});
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	console.log(`server is listening on ${port}`);
});