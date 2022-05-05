// const res = require("express/lib/response");

const cartMessage = document.querySelector('#cartMessage');
const cartItemContainer = document.querySelector('#cartItem');
const totalElement = document.querySelector('#total h3 span');
const total = document.querySelector('#total');

let totalPrice=0;

axios.get("http://localhost:3000/cart")
.then(result=>{
    if(result.data.length>0){
        cartItemContainer.style.display='block';
        total.style.display='block';
    }
    else{
        cartMessage.style.display='block';
        cartItemContainer.style.display='none';
        total.style.display='none';
    }
    result.data.forEach(product=>{
        cartMessage.innerText='';
        const cartItemCard = document.createElement('div');
        cartItemCard.classList.add('cartItemCard');
        cartItemCard.id=`item${product.id}`;

        const div1 = document.createElement('div');
        const img = document.createElement('img');
        img.src=product.imageUrl;
        div1.appendChild(img);
        const h2 = document.createElement('h2');
        h2.innerText=product.title;
        div1.appendChild(h2);

        cartItemCard.appendChild(div1);

        const div2=document.createElement('div');
        const p1=document.createElement('p');
        p1.innerText=`Rs. ${product.price}`;
        div2.appendChild(p1);
        cartItemCard.appendChild(div2);
        
        const div3=document.createElement('div');
        const p2=document.createElement('p');
        p2.innerText=product.cartItem.quantity;
        div3.appendChild(p2);
        const button=document.createElement('button');
        button.innerText=`REMOVE`;
        button.classList.add('btnDelete');
        div3.appendChild(button);
        cartItemCard.appendChild(div3);

        cartItemContainer.appendChild(cartItemCard);

        totalPrice=totalPrice+product.cartItem.quantity*product.price;
        totalElement.innerText='Rs.'+totalPrice;
    })
})
.catch(error=>console.log(error))

cartItemContainer.addEventListener('click',(e)=>{
    if(e.target.className=='btnDelete'){
        const elements=e.target.parentElement.parentElement.children;
        const priceOfDelete= +elements[1].firstChild.innerText.replace('Rs. ','');
        const qtyOfDelete = +elements[2].firstChild.innerText;
        const id=e.target.parentElement.parentElement.id.replace('item','');
        axios.post("http://localhost:3000/cart-delete-item",{id:id})
        .then((result)=>{
            const delId=document.querySelector(`#item${id}`);
            if(delId)
                delId.remove();

            
                cartItemId.forEach(cartItem=>{
                    const cartItemTotal = +cartItem.innerText;
                    cartItem.innerText= cartItemTotal - 1;
                })
            
            totalPrice=totalPrice-(priceOfDelete*qtyOfDelete);
            totalElement.innerText='Rs.'+totalPrice;
            if(totalPrice==0)
            {
                cartItemId.forEach(cartItem=>{
                    cartItem.classList.remove('cartItem');
                    cartItem.style.display='none';
                })
                
                cartItemContainer.style.display='none';
                total.style.display='none';
            }
        })
        .catch(error=>console.log(error));
    }
})


const order = document.querySelector('#order');
order.addEventListener('click',(e)=>{
    axios.post('http://localhost:3000/order',{id:200})
    .then(result=>{
        const delItems = document.querySelectorAll('.cartItemCard');
        delItems.forEach(item=>item.remove());
        cartItemContainer.style.display='none';
        total.style.display='none';

        //cartValue
        cartItem.innerText='';
        cartItem.classList.remove('cartItem');
        cartItem.style.display='none';
        //popup
        const header=document.querySelector('.popupCard h2');
        const description=document.querySelector('.popupCard p');
        header.innerText=`Your Order id is ${result.data.orderId}`;
        description.innerText=`Check out more attractive products from our product menu`;
        popupDisplay.classList.toggle('active');

        
        cartItemId.forEach(cartItem=>{
            cartItem.classList.remove('cartItem');
            cartItem.style.display='none';
        })
    })
    .catch(error=>console.log(error));
})