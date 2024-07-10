
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')


const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


function initRoutes(app){


    app.get('/', homeController().index)
    app.get('/cart', cartController().index)
    app.get('/login', guest, authController().login)
    app.get('/register', guest, authController().register)

    app.post('/update-cart', cartController().update)

    app.post('/register', authController().postRegister)
    app.post('/login', authController().postLogin)

    app.post('/logout', authController().logout)


    app.post('/orders', auth, orderController().store)

    app.get('/customer/orders',auth, orderController().index)


    app.get('/admin/orders',admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)


    app.get('/customer/orders/:id', auth, orderController().show)


  /*  app.get("/",(req,res)=>{
        res.render('home');
    })
    
    app.get("/cart", (req,res)=>{
        res.render('customers/cart');
    })
    
    app.get("/register", (req,res)=>{
        res.render('auth/register');
    })
    
    app.get("/login", (req,res)=>{
        res.render('auth/login');
    })  */

}


module.exports = initRoutes;