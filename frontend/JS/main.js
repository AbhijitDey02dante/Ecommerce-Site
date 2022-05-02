const navBtn=document.querySelector('#navButton');
const navMenu=document.querySelector('#navMenu');
const notification=document.querySelector('#notification');
const test=document.querySelector('#test');
const autoText = document.querySelector('#autoText p');
const popupDisplay = document.querySelector('.popupContainer');
const popupClose = document.querySelector('#closePopup');
const displayMode = document.querySelector('#displayMode');
// autoText.innerText='0';

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