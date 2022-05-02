const navBtn=document.querySelector('#navButton');
const navMenu=document.querySelector('#navMenu');

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