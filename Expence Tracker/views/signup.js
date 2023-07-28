const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const msg = document.querySelector("#msg");
const submit = document.querySelector("#submit");

submit.addEventListener('click',async ()=>{
    event.preventDefault();
    const obj = {'name':name.value,'email':email.value,'password':password.value};
    try{
        const res = await axios.post("http://3.90.229.193/user/signupUser",obj);
        
        if(res.data){
            msg.textContent='Success';
        }else{
            msg.textContent='User already exist!';
        }
        
    }
    catch(err){console.log(err)};

});