const email = document.getElementById('email');
const msg = document.getElementById('msg');
const submit = document.getElementById('submit');

submit.addEventListener('click', async()=>{
    event.preventDefault();
    const res = await axios.post("http://3.90.229.193/password/forgotPassword",{email : email.value});
    
    console.log(res);
});