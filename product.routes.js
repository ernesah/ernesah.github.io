const express = require('express');
const router = express.Router();
const SqlProvider = require('./sql.provider');
const HTTPStatus = require('http-status');
const path=require("path");
var bodyParser = require('body-parser');
//const ProductService = require('./product.service');
//noconst authMiddleware = require('./snipcartAuth.middleware');
const fs=require('fs');
const multer = require('multer');
const upload = multer({dest: __dirname + '/public/images'},
                      {filename: function (req, file, cb) {
                      cb(null, file.originalname + '.jpg')
      }
});

router.use(express.static('./views'))
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

router.get('/',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products where sector= "Summer Sale"', function (error, result, fields) {
      if (error) throw error;
      
      res.render("index",{ result: result});
    });
   
});

router.get('/',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products where sector= "New Arrivals"', function (error, results, fields) {
      if (error) throw error;
      
      res.render("index",{ results: results});
    });
   
});

router.get('/products',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  await connection.query('SELECT * FROM products', function (error, results, fields) {
      if (error) throw error;
      
      res.render("shop",{ results: results});
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
      if (error) throw error;
      res.render("glasses",{ results: results});
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

router.get('/product-single',async function (req, res) {
    
  const connection = await SqlProvider.getConnection();

  connection.query('SELECT * FROM products where sector="Must also like"', function (error, results, fields) {
      if (error) throw error;
      res.render("product-single",{ results: results});
    });
   res.json(results);
});

router.post('/', authMiddleware,
    async function (req, res) {

        const product = {
            name: req.body.name,
            categoryId: req.body.categoryId,
            subcategoryId: req.body.subcategoryId,
            price: req.body.price,
            weight: req.body.weight,
            description:req.body.description,
            photourl: req.body.url,
            photoname: req.body.photoname,
            sector: req.body.sector
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

router.get('/:id', async function (req, res) {
 
    const connection = await SqlProvider.getConnection();

    var productId= req.params.id;
    var sql = 'SELECT * FROM `products` where productId=?';

     var result = await connection.query(sql ,[productId])
     res.json(result);
  
});


router.delete('/:id',async function (req, res) {

  const connection = await SqlProvider.getConnection();

  connection.query('DELETE FROM `products` WHERE `productId`=?', [req.params.id], function (error, results) {
   if (error) throw error;
   console.log("Deleted!!")
   res.end('Record has been deleted!');
 });
});

router.put('/:id', authMiddleware,
 async function (req, res) {
    
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

    //me ndreq
    router.post('/:id/photos', authMiddleware, 
    async function (req, res) {

      const url = './public/images/'+req.files.photo.name;
      req.files.foto.mv(url, async function (error) {
          if (error) {
              return res.send(error);
          }
          const connection = await SqlProvider.getConnection();
    
          const result = await connection.query('UPDATE products SET ? where productId=?', [
              {
                photourl: url
              },
              req.params.id]);
    
          const udpatedObject = result[0];
    
          if (udpatedObject.affectedRows === 0) {
              return res.send(HTTPStatus.NOT_FOUND).end();
          }
    
          return res.send(HTTPStatus.OK).end();
      });
    });

    router.post('/webhook', async function (req, res) {
      if (req.body.eventName === "order.completed") {
          req.body.content.items.forEach(function(item){
               increase item order count
          });
      }
      
      console.log(req.body);
      return res.sendStatus(HTTPStatus.OK).end();
  });


router.get("/photo/:id", async function(req,res){
  const connection = await SqlProvider.getConnection();

  var productId= req.params.id;
  var sql = 'SELECT photourl FROM `products` where productId=?';

   var result = await connection.query(sql ,[productId])

   res.render(result);

});

router.get("/insert.html",function(req,res){
  res.sendFile('insert.html', {root : __dirname + '/views'});
});


router.post("/test", upload.single('photo1'),async function(req, res){ 

  const connection = await SqlProvider.getConnection();

  const name = req.body.name1
  const price = req.body.price1
  const weight = req.body.weight1
  const description = req.body.description1
  const category = req.body.category1
  const subcategory = req.body.subcategory1
  const img = fs.readFileSync(req.file.path);
  const url = req.file.path
  const photoname = req.file.originalname

  const sql = "INSERT INTO products (name, categoryId,subcategoryId, price, weight, description, photoblob, photourl) VALUES (?,?,?,?,?,?,?,?)";
  await connection.query(sql,[name,category,subcategory,price,weight,description,img,url], (err, results, fields) => {
  if (err) {
    console.log("Cannot insert " + err)
    res.sendStatus(500)
    return
  }
    console.log("Inserted")
    res.end()
 });
  });



router.use(express.static('public'));

 module.exports = router;