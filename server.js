const express = require('express');
const exphbs = require('express-handlebars');
var app = express();
const fs = require('fs');
const path = require("path");
const SqlProvider = require('./sql.provider');
const authMiddleware = require('./snipcartAuth.middleware');

var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
const productRoutes = require('./product.routes');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  //to support URL-encoded bodies
    extended: false
}));
//set port
var port= process.env.PORT || 3000

app.use('/', productRoutes);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json()); // add HTTP body to req.body
app.use('/public/', express.static('public')); // sherben static files

const multer = require('multer');

const upload = multer({ dest: __dirname + '/public/images' },
  {
    filename: function (req, file, cb) {
      cb(null, file.originalname + '.jpg')
    }
  });

//routes

app.post("/test", upload.single('photo1'), authMiddleware, async function(req, res){

    const connection = await SqlProvider.getConnection();

    var name = req.body.name1;
    var photourl = req.file.path;
    var img = fs.readFileSync(req.file.path); 
    var category = req.body.category1
    var subcategory = req.body.subcategory1
    var price = req.body.price1
    var weight = req.body.weight1
    var description = req.body.description1
    var sector = req.body.sector1
    var color = req.body.color1
    var materials = req.body.materials1
    var quantity = req.body.quantity1a 
    var photoname = req.file.originalname
  
    var sql = "INSERT INTO products (name, categoryId, subcategoryId, price, weight, description,img, photourl, photoname, sector, color, materials, maxquantity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(sql,[name,category,subcategory,price,weight,description,img,photourl,photoname,sector,color,materials,quantity], (err, results, fields) => {
    if (err) {
      console.log("Insertimi deshtoi. " + err)
      res.sendStatus(500)
      return
    }
      console.log("Insertimi u krye me sukses")
      res.end()
      
   });
  })

    app.post("edit/:id" , upload.single('photo1') , async function (req, res) {

      const connection = await SqlProvider.getConnection();

      var productId = req.params.id
      var name = req.body.name1
      var photourl = req.file.path;
      const img = fs.readFileSync(req.file.path); 
      var category = req.body.category1
      var subcategory = req.body.subcategory1
      var price = req.body.price1
      var weight = req.body.weight1
      var description = req.body.description1
      var sector = req.body.sector1
      var color = req.body.color1
      var materials = req.body.materials1
      var quantity = req.body.quantity1a 
      var photoname = req.file.originalname
      
      const sql = 'UPDATE products SET name='+name+',categoryId='+category+',subcategoryId='+subcategory+',price='+price+', weight='+weight+', description='+description+',photourl='+photourl+',photoname='+photoname+',sector='+sector+',color='+color+',material='+materials+', maxquantity='+quantity+' where productId='+productId+'';
      connection.query(sql, (err, results, fields) => {
        if (err) {
          console.log("Editimi deshtoi. " + err)
          res.sendStatus(500)
          return
        }
        console.log("Editimi u krye me sukses")
       res.redirect("listproducts");
      });
    });

app.get('/edit/:id',async function (req, res) {
  var productId= req.params.id;
  const connection = await SqlProvider.getConnection();
   await connection.query('Select * from products where productId='+productId+'' , function(error, results, fields){
     if(error) throw error;
     res.render("edit", { results: results });
   });
});

app.get('/delete/:id',async function (req, res) {
  var productId= req.params.id;
  const connection = await SqlProvider.getConnection();
    await connection.query('DELETE FROM `products` WHERE `productId`='+productId+'', function (error, results, fields) {
      if (error) throw error;
      console.log("Deleted!!")
      res.end('Record has been deleted!');
    });
});

app.delete('/delete/:id',async function (req, res) {
  var productId= req.params.id;
  const connection = await SqlProvider.getConnection();
  connection.query('DELETE FROM `products` WHERE `productId`='+productId+'', function (error, results) {
   if (error) throw error;
   console.log("Deleted!!")
   res.end('Record has been deleted!');
 });
});

app.listen(port, function() {
  console.log('App listening on port 3000');
});