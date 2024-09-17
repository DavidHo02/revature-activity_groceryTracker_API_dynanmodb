const http = require('http');
const { logger } = require('./util/logger');
const { groceryList, addItem, togglePurchased, deleteItem } = require('./groceryListFunctions');

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
                let nameParam = req.url.split('/')[2];
                nameParam = nameParam.replaceAll('%20', ' ');
                // console.log(nameParam);
                switch(req.method) {
                    case 'GET':
                        res.statusCode = 200;
                        res.end(JSON.stringify(groceryList));
                        break;
                    case 'POST':
                        //let { name, quantity, price, bought } = body;
                        let { name, quantity, price } = body;
                        if(!name || !quantity || !price) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({message: 'Could not process POST request'}));
                        }
                        //message = addItem(name, quantity, price, bought);
                        message = addItem(name, quantity, price);
                        res.statusCode = 201;
                        res.end(JSON.stringify({message, groceryList}));
                        break;
                    case 'PUT':
                        if(!nameParam) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({message: 'Could not process PUT request'}));
                        }
                        message = togglePurchased(nameParam);
                        res.status = 200;
                        res.end(JSON.stringify({message, groceryList}));
                        break;
                    case 'DELETE':
                        if(!nameParam) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({message: 'Could not process DELETE request'}));
                        }
                        message = deleteItem(nameParam);
                        res.status = 202;
                        res.end(JSON.stringify({message, groceryList}));
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