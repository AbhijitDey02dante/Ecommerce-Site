const navBtn=document.querySelector('#navButton');
const navMenu=document.querySelector('#navMenu');
const notification=document.querySelector('#notification');
const test=document.querySelector('#test');
const autoText = document.querySelector('#autoText p');
const popupDisplay = document.querySelector('.popupContainer');
const popupClose = document.querySelector('#closePopup');
const displayMode = document.querySelector('#displayMode');
// autoText.innerText='0';
const carousel = document.querySelector('.carousel');
const itemContainer = document.querySelector('#itemContainer');
const cartItem = document.querySelector('#cartValue');

if(sessionStorage.getItem('mode'))
{
    document.body.classList.toggle('active');
    displayMode.classList.toggle('active');
}
if(localStorage.length>0){
    cartItem.innerText=localStorage.length;
    cartItem.classList.add('cartItem');
}


//image array
let imgArray = ['https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
'https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=843&q=80',
'https://images.unsplash.com/photo-1580674287405-80cd77a2fee2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
'https://images.unsplash.com/photo-1502160348486-995f41fa55b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80']
//hamburger button********************
navBtn.addEventListener('click',()=>{
    navMenu.classList.toggle('active');
    navBtn.classList.toggle('active');
    if(navBtn.classList.contains('active'))
    {
        navBtn.innerText='×';
    }
    else
    {
        navBtn.innerText='☰';
    }
})

document.addEventListener('DOMContentLoaded',()=>{ 
    axios.get("http://localhost:3000/products")
    .then(result=>{
        result.data.forEach(product => {
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



//notification message***************
// test.addEventListener('click',()=>{
//     notificationMessage("This is the message");
// })
function notificationMessage(message){
    const notif=document.createElement('div');
    notif.innerText=message;

    notification.appendChild(notif);

    setTimeout(()=>{
        notif.remove();
    },3000);
}

//autoText********************
if(autoText){
    let index=0;
    let text=autoText.innerText;
    
    function writeText(){
        autoText.innerText=text.slice(0,index);
    
        index++;
        if(index>text.length)
            index=0;
    }
    
    setInterval(writeText,100);
}

//popup ************************
if(test){
    test.addEventListener('click',()=>{
        popupDisplay.classList.toggle('active');
    })
}

popupClose.addEventListener('click',()=>{
    popupDisplay.classList.toggle('active');
})

//DarkMode**********************
displayMode.addEventListener('click',()=>{
    document.body.classList.toggle('active');
    displayMode.classList.toggle('active');
    if(sessionStorage.getItem('mode'))
        sessionStorage.removeItem('mode');
    else
        sessionStorage.setItem('mode','on');
})
//Carousel********************* 
if(carousel){
    let imageIndex=0;
    function changeImage(){
        carousel.style.backgroundImage=`url(${imgArray[imageIndex]})`
        imageIndex++;
        if(imageIndex>imgArray.length-1)
            imageIndex=0;
    }
    
    setInterval(changeImage,3000);
}

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
                price: childElement[3].innerText
            }
            localStorage.setItem(prodId,JSON.stringify(obj));
            cartItem.innerText=localStorage.length;
            cartItem.classList.add('cartItem');
            notificationMessage(`Item ${childElement[1].innerText} has been added to your cart`);
        }
    })
}

