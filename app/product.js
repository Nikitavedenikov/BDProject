let prodDao = require('./storage/prodStorage');
let catDao = require('./storage/categoryStorage');

module.exports = { initProduct }

function initProduct(app, jsonParser) {
    //Products
    app.get('/prod', function(req, res) {
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.getAllProducts().then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    //Get all categories of product by id of product
    app.get('/prodcat/:id', function(req, res) {
        console.log("prod");
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        catDao.getCategoriesByProdCd(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    //Get all products by id of manufacturer
    app.get('/prodmanuf/:id', function(req, res) {
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.getProductsByManufId(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    app.get('/prod/:id', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.getProductById(req.params.id).then((data) => {
                let dataToSend = JSON.stringify(data[0][0]);
                res.write(dataToSend);
                res.end();
            })
            .catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    app.post('/prod', jsonParser, async function(req, res) {
        //check token
        const prod_cd = req.body.prod_cd;
        let prod_notes = (req.body.prod_notes === undefined) ? null : req.body.prod_notes;
        let dataProd = [prod_cd, req.body.prod_name, req.body.prod_unit, 0, prod_notes, req.body.man_id];
        let dataCategs = req.body.categs;
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.addNewProduct(prod_cd, dataProd, dataCategs)
            .then(() => {
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

    app.put('/prod/:id', jsonParser, async function(req, res) {
        const prod_cd = req.params.id;
        //check token
        let prod_notes = (req.body.prod_notes === undefined) ? null : req.body.prod_notes;
        let dataProd = [req.body.prod_name,
            req.body.prod_unit,
            prod_notes,
            req.body.man_id
        ];
        let dataCategs = req.body.categs;
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        prodDao.updateProductById(prod_cd, dataProd, dataCategs)
            .then(() => {
                res.end();
            }).catch(err => {
                res.write(err.stack);
                res.end();
            });
    });

}