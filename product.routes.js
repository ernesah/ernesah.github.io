const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
const HTTPStatus = require('http-status');
const path=require("path");
var bodyParser = require('body-parser');
const authMiddleware = require('./snipcartAuth.middleware');
const fs = require('fs');

router.use(express.static('./views'))
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

router.get('/', async function (req, res) {

  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where sector= "New Arrivals"', function(error, result, fields) {
    connection.query('SELECT * FROM products where sector= "Summer Sale"', function(error1, result1, fields1) {
      
  res.render("index", { result: result, result1: result1});
    });

});
res.json(results);
});

router.get('/products',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      
      res.render("products",{ results: results});
    });
    res.json(results);
   
});

router.get('/jewelry',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where categoryId=1', function (error, results, fields) {
      if (error) throw error;
      res.render("jewelry",{ results: results});
    });
   res.json(results);
});

router.get('/jewelry/necklaces',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where subcategoryId=1', function (error, results, fields) {
      if (error) throw error;
      res.render("jewelry",{ results: results});
    });
   res.json(results);
});

router.get('/jewelry/bracelets',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where subcategoryId=2', function (error, results, fields) {
      if (error) throw error;
      res.render("jewelry",{ results: results});
    });
   res.json(results);
});

router.get('/jewelry/earrings',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where subcategoryId=3', function (error, results, fields) {
      if (error) throw error;
      res.render("jewelry",{ results: results});
    });
   res.json(results);
});

router.get('/jewelry/rings',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where subcategoryId=4', function (error, results, fields) {
      if (error) throw error;
      res.render("jewelry",{ results: results});
    });
   res.json(results);
});

router.get('/watches',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where categoryId=2', function (error, results, fields) {
      if (error) throw error;
      res.render("watches",{ results: results});
    });
   res.json(results);
});

router.get('/glasses',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where categoryId=3', function (error, results, fields) {
    connection.query('SELECT subcategory FROM subcategory where categoryId=3', function (error, results1, fields1) {
      res.render("glasses",{ results: results, results1: results1});
    });
  });
   res.json(results);
});

router.get('/glasses/sunglasses',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where subcategoryId=6', function (error, results, fields) {
      if (error) throw error;
      res.render("glasses",{ results: results});
    });
   res.json(results);
});

router.get('/glasses/opticalglasses',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where subcategoryId=7', function (error, results, fields) {
      if (error) throw error;
      res.render("glasses",{ results: results});
    });
   res.json(results);
});
router.get('/helmets',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where categoryId=4', function (error, results, fields) {
      if (error) throw error;
      res.render("helmets",{ results: results});
    });
   res.json(results);
});

router.get("/listproducts",async function(req,res){
  const connection = await SqlProvider.getConnection();
   connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    res.render("listproducts", { results: results });
    });
    res.json(results);
});

router.get("/insert",function(req,res){
  res.render("insert");
});

router.get("/about",function(req,res){
  res.render("about");
});

router.get("/contact",function(req,res){
  res.render("contact");
});

router.get('/:id', async function (req, res) {
 
  const connection = await SqlProvider.getConnection();

  var productId= req.params.id;
  connection.query('SELECT * FROM products  where productId='+productId+'', function (error, results, fields) {
    connection.query('SELECT * FROM products where sector="Must Also Like"', function (error, results1, fields1){
      connection.query('SELECT photoname from products_photos where productId='+productId+'', function (error, results2, fields2){

      res.render("product-single",{ results: results, results1: results1, results2: results2});
    });
  });
});
});

router.post('/', authMiddleware ,async function (req, res) {

        const product = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            price: req.body.price,
            weight: req.body.weight,
            description:req.body.description,
            img: req.body.img,
            photourl: req.body.url,
            photoname: req.body.photoname,
            sector: req.body.sector,
            color : req.body.color,
            materials : req.body.materials,
            maxquantity : req.body.quantity
        }

        const connection = await SqlProvider.getConnection();

        const result = await connection.query('INSERT INTO `products` SET ?', product);
        const insertedObject = result[0];

        if (insertedObject.affectedRows === 0) {
            return res.send(HTTPStatus.INTERNAL_SERVER_ERROR).end();
        }

        return res.send(HTTPStatus.OK).end();
    }
);

router.put('/:id', authMiddleware,async function (req, res) {
    
  const product = {}

  if (req.body.name) {
      product.name = req.body.name;
  }
  if (req.body.price) {
    product.price = req.body.price;
  }
  if (req.body.weight) {
    product.weight = req.body.weight;
  }

  const connection = await SqlProvider.getConnection();

  const result = await connection.query('Update products SET ? where productId=?', [product, req.params.id]);
  const udpatedObject = result[0];

  if (udpatedObject.affectedRows === 0) {
      return res.send(HTTPStatus.NOT_FOUND).end();
  }

  return res.send(HTTPStatus.OK).end();
});

  router.post('/webhook', async function (req, res) {
    if (req.body.eventName === "order.completed") {
        req.body.content.items.forEach(function(item){
            // increase item order count
            const pId = req.body.content.items.id
            const connection =  SqlProvider.getConnection();
  
            const result =  connection.query('Update orders SET orderscount='+orderscount+'+1 where productId='+pId+'');
            const udpatedObject = result[0];
  
            if (udpatedObject.affectedRows === 0) {
              return res.send(HTTPStatus.NOT_FOUND).end();
            }
                   return res.send(HTTPStatus.OK).end();
  
          });
    
        }
    
    console.log(req.body);
    return res.sendStatus(HTTPStatus.OK).end();
  });

router.use(express.static('public'));

 module.exports = router;