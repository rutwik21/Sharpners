
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const msg = document.querySelector("#msg");
const submit = document.querySelector("#submit");


submit.addEventListener('click',async ()=>{
    event.preventDefault();
    const obj = {'email':email.value,'password':password.value};
    try{
        const res = await axios.post("https://34.207.207.120:4000/user/loginUser",obj);
        localStorage.setItem('token',res.data.userId ) ;
        localStorage.setItem('name',res.data.name ) ;
        location.replace('index.html');
    }
    catch(err){

        if(err.response.status === 404){
            msg.textContent='USER NOT FOUND!';
        }
        else{
            msg.textContent=`Password is incorrect !`;
        };
    };

});