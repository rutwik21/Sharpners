const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector('#phone');
const password = document.querySelector("#password");
const msg = document.querySelector("#msg");
const submit = document.querySelector("#submit");

submit.addEventListener('click',async ()=>{
    event.preventDefault();
    const obj = {'name':name.value,'email':email.value,'phone':phone.value,'password':password.value};
    try{
        const res = await axios.post("http://localhost:3000/user/signupUser",obj);
        
        if(res.data){
            msg.textContent='Success';
        }else{
            msg.textContent='User already exist!';
        }
        
    }
    catch(err){console.log(err)};

});