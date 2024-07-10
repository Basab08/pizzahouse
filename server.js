require('dotenv').config();

const express = require('express');

const ejs = require('ejs');

const expressLayout = require('express-ejs-layouts');

const path = require('path');

const app = express();

const PORT = process.env.PORT || 3500;

const mongoose = require('mongoose');

//const url = 'mongodb://localhost/pizza';

const session = require('express-session');

const flash = require('express-flash');


const MongoStore = require('connect-mongo');

const passport = require('passport')

const Emitter = require('events')

// Database connection


mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected...');
});

connection.on('error', (err) => {
    console.log('Connection failed...', err);
});

//session store

const mongoStore = MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL ,
    collectionName: 'sessions'
});


// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)




//Global Middlewire



/*app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = { totalQty: 0 };
    }
    next();
});*/




//Session config

app.use(session({
    secret: process.env.COOKIE_SECRET || 'defaultsecret',
    resave: false,
     store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());

//Asset
//app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use((req, res, next) => {
    console.log('Current user:', req.user);
    res.locals.user = req.user;
    next();
});

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');


require('./routes/web')(app)

app.use(()=>{
    res.status(404).send('<h1>404, Page Not Found</h1>');
})








const server = app.listen(PORT, () => {
    console.log("Listening");
}) 

// socket

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})
