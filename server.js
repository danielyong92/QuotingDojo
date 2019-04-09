var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

const flash = require('express-flash');
app.use(flash());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quoting_dojo');

var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: "Please Enter a Name!", trim:true, minlength: 2},
    quote: { type: String, required: "Please Enter a Quote!", trim:true,minlength: 2},
}, {timestamps: true});

mongoose.model('Quotes', QuoteSchema); // We are setting this Schema in our Models as 'User'
var Quote = mongoose.model('Quotes')

/////////////Routes//////////////
app.get('/', function (req, res) {

    res.render('index');
})

app.get('/quotes', function (req, res) {
    
    Quote.find({}, function (err, allquotes)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render('quotes', {allquotes:allquotes});
        }
    })
    
})

app.post('/processing', function (req, res) {
    console.log("POST DATA", req.body);

    quote = new Quote({ name: req.body.name, quote: req.body.quote });

    quote.save(function (err){
        if(err){
            // if there is an error upon saving, use console.log to see what is in the err object 
            console.log("We have an error!", err);
            // adjust the code below as needed to create a flash message with the tag and content you would like
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            // redirect the user to an appropriate route
            res.redirect('/');
        }
        else {
            console.log('successfully added a user!');
            console.log(quote);
            res.redirect('/');
        }
    });
});

app.listen(5000, function () {
    console.log("listening on port 5000");
})
