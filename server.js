const express = require('express');
const exphbs = require('express-handlebars');
var app = express();
const productRoutes = require('./product.routes');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
//set port
var port= process.env.PORT || 3000

app.use('/api', productRoutes);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json()); // add HTTP body to req.body
app.use('/public/', express.static('public')); // sherben files static

//routes
app.get("/",function(req,res){
    res.render("index", {data: req.bodyParser});
})

app.get("/products",function(req,res){
    res.render("shop", {data: req.bodyParser});
})

app.get("/jewelry",function(req,res){
    res.render("jewelry", {data: req.bodyParser});
})

app.get("/jewelry/necklaces",function(req,res){
    res.render("jewelry", {data: req.bodyParser});
})

app.get("/jewelry/bracelets",function(req,res){
    res.render("jewelry", {data: req.bodyParser});
})

app.get("/jewelry/earrings",function(req,res){
    res.render("jewelry", {data: req.bodyParser});
})

app.get("/jewelry/rings",function(req,res){
    res.render("jewelry", {data: req.bodyParser});
})

app.get("/watches",function(req,res){
    res.render("watches", {data: req.bodyParser});
})

app.get("/glasses",function(req,res){
    res.render("glasses", {data: req.bodyParser});
})

app.get("/glasses/sunglasses",function(req,res){
    res.render("glasses", {data: req.bodyParser});
})

app.get("/glasses/opticalglasses",function(req,res){
    res.render("glasses", {data: req.bodyParser});
})

app.get("/helmets",function(req,res){
    res.render("helmets", {data: req.bodyParser});
})

app.get("/product-single",function(req,res){
    res.render("product-single", {data: req.bodyParser});
})

app.get("/about",function(req,res){
    res.render("about");
})

app.get("/contact",function(req,res){
    res.render("contact");
})

app.listen(3000, function () {
    console.log("App listening on 3000")
});

