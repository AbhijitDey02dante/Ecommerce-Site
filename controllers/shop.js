const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');

let ITEMS_PER_PAGE=4;

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalItems;

  Product.count()
  .then(numProducts=>{
    totalItems=numProducts;
    return Product.findAll({limit:ITEMS_PER_PAGE , offset:(page-1)*ITEMS_PER_PAGE})
  })
  .then((products)=>{
    const detailedProducts = [{total: totalItems},[...products]];
    res.json(detailedProducts);
    // res.json({total: totalItems})
  })
  .catch(error => console.log(error))
};

exports.getIDProduct = (req,res,next) => {
  const prodID = req.params.productID;
  Product.findAll({where: {id:prodID}})
  .then((products)=>{
    res.render('shop/product-detail',{
      product: products[0],
      pageTitle: 'Product Details',
      path: '/product'
    });
  })
  .catch(error => console.log(error));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
  })
  .catch(error=>console.log(error))
};

exports.getCart = (req, res, next) => {
  // console.log(req.user.getCart());
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
      res.json(products);
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err));
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.id;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
 
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}
    

  //   return Product.findByPk(prodId)
  //   .then(product =>{
  //     return fetchedCart.addProduct(product, { 
  //       through: { quantity: newQuantity}
  //     });
  //   })
  //   .catch(err => console.log(err));
  // })
  // .then(()=>{
  //   res.redirect('/cart');
  // })
  // .catch(err => console.log(err))
// }

exports.postCartDelete = (req,res,next) => {
  const prodID = req.body.id;
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({where:{id:prodID}})
  })
  .then(products=>{
    const product=products[0];
    // console.log(product);
    return product.cartItem.destroy();
  })
  .then((result)=>{
    res.json(result);
    // res.redirect('/cart');
  })
  .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postOrder = (req,res,next) => {
  let orderId;
  req.user.createOrder()
  .then(result=>{
    orderId=result.id;
    CartItem.findAll()
    .then(product=>{
      for(let i=0;i<product.length;i++){
        const quantity=product[i].quantity;
        const prodId=product[i].productId;
        product[i].destroy();
        OrderItem.create({
          productId:prodId,
          quantity:quantity,
          orderId:result.id
        })
        .then(()=>console.log('Ordered'))
        .catch(error=>console.log(error));
      }

      res.json({orderId:orderId, success:true})
  })
})
  .catch(error=>console.log(error));
}