const itemContainer = document.querySelector('#itemContainer');
const pageNumber = document.querySelector('#pageNumber');
let page=1;

document.addEventListener('DOMContentLoaded',()=>{ 
    axios.get("http://localhost:3000/products?page=1")
    .then(result=>{
        let totalPages=Math.ceil(result.data[0].total / 4);
        for(let i=0;i<totalPages;i++){
            const span=document.createElement('span');
            span.id=`page${page}`
            span.innerText=page;
            page++;

            pageNumber.appendChild(span);
        }



        result.data[1].forEach(product => {
            const itemCard=document.createElement('div');
            itemCard.classList.add('itemCard');
            itemCard.id=product.id;

            const zoomCard=document.createElement('div');
            zoomCard.classList.add('zoomCard');
            const img=document.createElement('img');
            img.src=product.imageUrl;
            zoomCard.appendChild(img);
            itemCard.append(zoomCard);

            const h2=document.createElement('h2');
            h2.innerText=product.title;
            itemCard.appendChild(h2);

            const p=document.createElement('p');
            p.innerText=product.description;
            itemCard.appendChild(p);

            const span=document.createElement('span');
            span.innerText=`Rs. ${product.price}`;
            itemCard.appendChild(span);

            const button=document.createElement('button');
            button.classList.add('btn');
            button.innerText='Add to cart';
            itemCard.appendChild(button);

            itemContainer.appendChild(itemCard);
        })
    })
    .catch(error=>{
        popupDisplay.classList.toggle('active');
        console.log(error);
    });
})
//zoom image*********************
if(itemContainer){
    itemContainer.addEventListener('mousemove',(e)=>{
        if(e.target.tagName==='IMG'){
            e.target.style.transform = `scale(2)`;
            e.target.style.transition = `transform 0.5s`;
            e.target.addEventListener('mouseleave',element=>{
                element.target.style.transform=`scale(1)`;
            })
        }
    })

    itemContainer.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON')
        {
            const element=e.target.parentElement;
            const prodId=element.id;
            const childElement=element.children;
            const obj={
                id:prodId,
                imageUrl: childElement[0].children[0].src,
                title: childElement[1].innerText,
                description: childElement[2].innerText,
                price: +childElement[3].innerText.replace('Rs. ','')
            }
            // localStorage.setItem(prodId,JSON.stringify(obj));
            // cartItem.innerText=localStorage.length;
            // cartItem.classList.add('cartItem');
            axios.post("http://localhost:3000/cart",obj)
            .then(()=>{
                notificationMessage(`Item ${childElement[1].innerText} has been added to your cart`);
            })
            .catch(error=>console.log(error));
        }
    })
}

pageNumber.addEventListener('click',(e)=>{
    if(e.target.tagName==='SPAN'){
        const currentProducts=document.querySelectorAll('#itemContainer div');
        currentProducts.forEach(element=>element.remove());
        const pageSelected=e.target.innerText;
        axios.get(`http://localhost:3000/products?page=${pageSelected}`)
    .then(result=>{
        result.data[1].forEach(product => {
            const itemCard=document.createElement('div');
            itemCard.classList.add('itemCard');
            itemCard.id=product.id;

            const zoomCard=document.createElement('div');
            zoomCard.classList.add('zoomCard');
            const img=document.createElement('img');
            img.src=product.imageUrl;
            zoomCard.appendChild(img);
            itemCard.append(zoomCard);

            const h2=document.createElement('h2');
            h2.innerText=product.title;
            itemCard.appendChild(h2);

            const p=document.createElement('p');
            p.innerText=product.description;
            itemCard.appendChild(p);

            const span=document.createElement('span');
            span.innerText=`Rs. ${product.price}`;
            itemCard.appendChild(span);

            const button=document.createElement('button');
            button.classList.add('btn');
            button.innerText='Add to cart';
            itemCard.appendChild(button);

            itemContainer.appendChild(itemCard);
        })
    })
    .catch(error=>{
        popupDisplay.classList.toggle('active');
        console.log(error);
    });
    }
})