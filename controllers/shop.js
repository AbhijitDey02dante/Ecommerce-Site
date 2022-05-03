const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products)=>{
    // res.render('shop/product-list', {
    //   prods: products,
    //   pageTitle: 'All Products',
    //   path: '/products'
    // });
    res.json(products);
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
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err));
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
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
  const prodID = req.body.productId;
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
  .then(()=>{
    res.redirect('/cart');
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
