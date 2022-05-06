const orderContainer = document.querySelector('.orderContainer');
axios.get('http://35.160.38.67:3000/order')
.then(result=>{
    result.data.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('orderCard');
        const h2=document.createElement('h2');
        h2.innerText=`Order id ${order.id}`;
        orderCard.appendChild(h2);

        let totalPrice=0;
        order.products.forEach(products=>{
            const div=document.createElement('div');
            const img=document.createElement('img');
            img.src=products.imageUrl;
            div.appendChild(img);
            const h3=document.createElement('h3');
            h3.innerText=products.title;
            div.appendChild(h3);
            const p=document.createElement('p');
            p.innerText='Rs.'+products.price+' × '+products.orderItem.quantity;
            totalPrice= totalPrice + products.price*products.orderItem.quantity;
            div.appendChild(p);

            orderCard.appendChild(div);
        })
        const h3=document.createElement('h3');
        h3.innerText=`Total Price : `+totalPrice;
        orderCard.appendChild(h3);


        orderContainer.appendChild(orderCard);
    });
    
})
