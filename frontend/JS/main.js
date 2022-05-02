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
const zoomCard = document.querySelector('.zoomCard');
const zoomImg = document.querySelector('.zoomCard img');



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
        navBtn.innerText='X';
    }
    else
    {
        navBtn.innerText='☰';
    }
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
let index=0;
let text="This is a dummy ecommerce site";

function writeText(){
    autoText.innerText=text.slice(0,index);

    index++;
    if(index>text.length)
        index=0;
}

setInterval(writeText,100);

//popup ************************

test.addEventListener('click',()=>{
    popupDisplay.classList.toggle('active');
})

popupClose.addEventListener('click',()=>{
    popupDisplay.classList.toggle('active');
})

//DarkMode**********************
displayMode.addEventListener('click',()=>{
    document.body.classList.toggle('active');
    displayMode.classList.toggle('active');
})
//Carousel********************* 
let imageIndex=0;
function changeImage(){
    carousel.style.backgroundImage=`url(${imgArray[imageIndex]})`
    imageIndex++;
    if(imageIndex>imgArray.length-1)
        imageIndex=0;
}

setInterval(changeImage,3000);

//zoom image*********************
zoomCard.addEventListener('mousemove',(e)=>{
    let x=e.clientX - e.target.offsetLeft;
    let y=e.clientY - e.target.offsetTop;

    zoomImg.style.transformOrigin = `${x}px ${y}px`;
    zoomImg.style.transform = `scale(2)`;
})

zoomCard.addEventListener('mouseleave',()=>{
    zoomImg.style.transformOrigin = `center center`;
    zoomImg.style.transform = `scale(1)`;
})