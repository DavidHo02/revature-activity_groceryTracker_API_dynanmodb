const http = require('http');
const { logger } = require('./util/logger');
const { getItems, addItem, editItem, deleteItem } = require('./groceryListFunctions');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let body = '';
    let message = '';

    req
        .on('data', (chunk) => {
            body += chunk;
        })
        .on('end', () => {
            body = body.length > 0 ? JSON.parse(body) : {};

            if(req.url.startsWith('/items')) {
                let idParam = req.url.split('/')[2];
                switch(req.method) {
                    case 'GET':
                        getItems()
                            .then((items) => {
                                res.statusCode = 200;
                                res.end(JSON.stringify(items));
                            });
                        break;
                    case 'POST':
                        let { name, quantity, price } = body;
                        if(!name || !quantity || !price) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({message: 'Could not process POST request'}));
                        }
                        addItem(name, quantity, price);
                        res.statusCode = 201;
                        res.end(JSON.stringify({message: 'Processed POST request'}));
                        break;
                    case 'PUT':
                        if(!idParam) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({message: 'Could not process PUT request'}));
                        }
                        const { bought } = body;
                        console.log(`newBool is: ${bought}`);
                        editItem(idParam, bought);
                        res.status = 200;
                        res.end(JSON.stringify({message: 'Processed PUT request'}));
                        break;
                    case 'DELETE':
                        if(!idParam) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({message: 'Could not process DELETE request'}));
                        }
                        deleteItem(idParam);
                        res.status = 202;
                        res.end(JSON.stringify({message: 'Processed DELETE request'}));
                        break;
                    default:
                        break;
                }
            }
        });
});

server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});