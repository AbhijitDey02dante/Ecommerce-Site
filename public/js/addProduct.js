const title=document.querySelector('#title');
const imageUrl=document.querySelector('#imageUrl');
const price=document.querySelector('#price');
const description=document.querySelector('#description');
const form=document.querySelector('#addProductForm');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const obj={
        title:title.value,
        imageUrl:imageUrl.value,
        price:price.value,
        description:description.value
    }
    console.log(obj);
    axios.post("http://35.160.38.67:3000/add-product",obj)
    .then(()=>console.log('added'))
    .catch((error)=>console.log(error));
})

