const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv=require('dotenv');

const app = express();
dotenv.config();


const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');


app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user=user;
        next();
    })
    .catch(error=>console.log(error));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Defining Assosication, one statement is enough
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
// .sync({ force:true })
.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user)
        return User.create({name:"Abhijit", email:"test@gmail.com"});
    return user;
})
.then(user => {
    return user.createCart();
})
.then(()=>{
    app.listen(3000);
})
.catch(error => console.log(error));

