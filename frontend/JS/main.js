const navBtn=document.querySelector('#navButton');
const navMenu=document.querySelector('#navMenu');
const notification=document.querySelector('#notification');
const test=document.querySelector('#test');

//hamburger button
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

//notification message
test.addEventListener('click',()=>{
    notificationMessage("This is the message");
})

function notificationMessage(message){
    const notif=document.createElement('div');
    notif.innerText=message;

    notification.appendChild(notif);

    setTimeout(()=>{
        notif.remove();
    },3000);
}