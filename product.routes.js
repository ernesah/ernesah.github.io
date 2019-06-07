const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
const HTTPStatus = require('http-status');
var bodyParser = require('body-parser');

router.use(express.static('./views'))
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));


router.get('/products',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});

router.get('/products/:id', async function (req, res) {
 
    const connection = await SqlProvider.getConnection();

    var productId= req.params.id;
    var sql = 'SELECT * FROM products where productId=?';

     var result = await connection.query(sql ,[productId])
     if (error) throw error;
     res.json(result) ;
  
});



router.delete('/products/:id',async function (req, res) {

  const connection = await SqlProvider.getConnection();

  connection.query('DELETE FROM products WHERE `productId`=?', [req.params.id], function (error, results) {
   if (error) throw error;
   console.log("Deleted!!")
   res.end('Record has been deleted!');
 });
});


router.post("/insert",async function(req, res){

  const connection = await SqlProvider.getConnection();

  const name = req.body.name1
  const price = req.body.price1
  const weight = req.body.weight1
  const description = req.body.description1
  const category = req.body.category1
  const subcategory = req.body.subcategory1
  const photo = req.body.photo1


  const sql = "INSERT INTO products (name,categoryId,subcategoryId,price, weight, description,photoId) VALUES (?,?,?,?,?,?,?)";
  await connection.query(sql,[name,category,subcategory,price,weight,description,photo], (err, results, fields) => {
  if (err) {
    console.log("Cannot insert " + err)
    res.sendStatus(500)
    return
  }
    console.log("Inserted")
    res.end()
 });
  });


router.post('/',  async function (req, res) {

    const product = {

        categoryId: req.body.categoryId,
        subcategoryId: req.body.subcategoryId,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        description:req.body.description,
        photoId: req.body.photoId
        
    }

    const connection = await SqlProvider.getConnection();

    const result = await connection.query('INSERT INTO products SET ?', product);
    const insertedObject = result[0];

    if (insertedObject.affectedRows === 0) {
        return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
    }

    return res.send(HTTPStatus.OK).end();
}
);

  router.put('/:id', async function (req, res) {
    
    const produkt = {}

    if (req.body.name) {
        product.name = req.body.name;
    }
    if (req.body.price) {
        product.price = req.body.price;
    }
    if (req.body.weight) {
        produkt.weight = req.body.weight;
    }

    const connection = await SqlProvider.getConnection();

    const result = await connection.query('Update products SET ? where productId=?', [product, req.params.id]);
    const udpatedObject = result[0];

    if (udpatedObject.affectedRows === 0) {
        return res.send(HTTPStatus.NOT_FOUND).end();
    }

    return res.send(HTTPStatus.OK).end();
});

router.get('/category',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM category', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});

router.get('/subcategory',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM subcategory', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
   
});

router.post('/:id/photos', async function (req, res) {

  const url = './public/images/' + req.files.photo.name;
  req.files.photo.mv(url, async function (error) {
     if (error) {
        return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
      }
      const connection = await SqlProvider.getConnection();

      const result = await connection.query('UPDATE products SET ? where productId=?', [
         {
           photoId: url
          },
          req.params.id]);

      const udpatedObject = result[0];

      if (udpatedObject.affectedRows === 0) {
          return res.send(HTTPStatus.NOT_FOUND).end();
      }

      return res.send(HTTPStatus.OK).end();
  });
});

 module.exports = router;