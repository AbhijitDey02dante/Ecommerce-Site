const cartMessage = document.querySelector('#cartMessage');
const cartItemContainer = document.querySelector('#itemContainer');
if(localStorage.length<=0)
    cartMessage.innerText='You do not have any items in your cart..........';
else{
    for(let i=0;i<localStorage.length;i++){
        const product=JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        cartMessage.innerText='';
        const itemCard = document.createElement('div');
        itemCard.classList.add('itemCard');
        itemCard.id=product.id;

        const zoomCard = document.createElement('div');
        zoomCard.classList.add('zoomCard');
        const img = document.createElement('img');
        img.src=product.imageUrl;
        zoomCard.appendChild(img);

        itemCard.appendChild(zoomCard);

        const title = document.createElement('h2');
        title.innerText=product.title;
        itemCard.appendChild(title);

        const description = document.createElement('p');
        description.innerText=product.description;
        itemCard.appendChild(description);

        const price= document.createElement('span');
        price.innerText=product.price;
        itemCard.appendChild(price);


        cartItemContainer.appendChild(itemCard);
    }

}