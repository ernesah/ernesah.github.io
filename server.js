const express = require('express');
const exphbs = require('express-handlebars');
var app = express();
const productRoutes = require('./product.routes');
const bodyParser = require('body-parser');


//set port
var port= process.env.PORT || 3000

const handlebars = exphbs({ defaultLayout: "main" });
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

app.use('/api/products', productRoutes);

//routes
app.get("/",function(req,res){
    res.render("index");
})

app.get("/shop",function(req,res){
    res.render("shop");
})

app.get("/jewelry",function(req,res){
    res.render("jewelry");
})

app.get("/glasses",function(req,res){
    res.render("glasses");
})

app.get("/helmets",function(req,res){
    res.render("helmets");
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

app.use('/public/', express.static('public')); // sherben files static
