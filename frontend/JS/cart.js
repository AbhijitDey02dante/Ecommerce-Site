const cartMessage = document.querySelector('#cartMessage');
const cartItemContainer = document.querySelector('#cartItem');
if(localStorage.length<=0)
    cartMessage.innerText='You do not have any items in your cart..........';
else{
    for(let i=0;i<localStorage.length;i++){
        cartItemContainer.style.display='block';

        const product=JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        cartMessage.innerText='';
        const cartItemCard = document.createElement('div');
        cartItemCard.classList.add('cartItemCard');
        cartItemCard.id=product.id;

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
        p1.innerText=product.price;
        div2.appendChild(p1);
        cartItemCard.appendChild(div2);
        
        const div3=document.createElement('div');
        const p2=document.createElement('p');
        p2.innerText=`1`;
        div3.appendChild(p2);
        const button=document.createElement('button');
        button.innerText=`REMOVE`;
        button.classList.add('btnDelete');
        div3.appendChild(button);
        cartItemCard.appendChild(div3);

        cartItemContainer.appendChild(cartItemCard);
        
    }

}