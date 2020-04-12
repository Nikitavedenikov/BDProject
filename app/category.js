const catDao = require('./storage/categoryStorage');
module.exports = { initCategory }

function initCategory(app, jsonParser) {
    //Category
    app.get('/category', function(req, res) {
        //TODO - check token + session 
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write("Categories");
        res.end();
    });

    app.get('/category/:id', function(req, res) {
        //TODO - check token + session     
        const myid = req.params.id;
        console.log('id = ' + myid);
        res.write("Category with id = " + myid);
        res.end();
    });

    app.post('/category', jsonParser, async function(req, res) {
        //TODO - check token + session 
        let catName = req.body.cat_name;
        let catNotes = (req.body.cat_notes === undefined) ? null : req.body.cat_notes;
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        catDao.insertNewCategory(catName, catNotes).then((data) => {
            //let dataToSend = JSON.stringify(data[0]);
            //res.write(dataToSend);
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    });
    app.put('/category/:id', jsonParser, async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        let data = req.body;
        //TODO - db update batch with data
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        res.write('Updated category');
        res.end();
    });

    app.delete('/category/:id', async function(req, res) {
        //TODO - check token + session 
        const id = req.params.id;
        res.writeHead(200, { "Content-type": "text/plain; charset=utf-8" });
        catDao.deleteCategoryById(id).then((data) => {
            //let dataToSend = JSON.stringify(data[0]);
            //res.write(dataToSend);
            res.end();
        }).catch(err => {
            res.write(err.stack);
            res.end();
        });
    });
}