const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

if(token){
const msg = document.querySelector("#msg");
const send = document.querySelector("button");
const chat = document.querySelector("#chat");

async function getChats(){
    const res = await axios.get("http://localhost:3000/chat/getChat");
    
    res.data.data.forEach(element => {
        const newdiv = document.createElement('div');
        const small = document.createElement('small');
        const msgdiv = document.createElement('div');

        newdiv.className='card border-0 w-75 p-2 mb-2 bg-body-secondary float-end';
        small.className='text-secondary';
        msgdiv.className='card-text';

        small.textContent=element.name;
        msgdiv.textContent=element.massage;
        
        newdiv.appendChild(small);
        newdiv.appendChild(msgdiv);
        chat.appendChild(newdiv);
        chat.scrollTop = chat.scrollHeight;
    });
}
getChats();


    send.addEventListener('click',async ()=>{
        event.preventDefault();

        if(msg.value != ''){

            const obj = {'userId':token,'massage':msg.value,'name':name};
            try{
                const res = await axios.post("http://localhost:3000/chat/newChat",obj);
                if(res.data.success === true){
                    
                    const newdiv = document.createElement('div');
                    const small = document.createElement('small');
                    const msgdiv = document.createElement('div');

                    newdiv.className='card border-0 w-75 p-2 mb-2 bg-body-secondary float-end';
                    small.className='text-secondary';
                    msgdiv.className='card-text';

                    small.textContent=`${name}`;
                    msgdiv.textContent=msg.value;
                    
                    newdiv.appendChild(small);
                    newdiv.appendChild(msgdiv);
                    chat.appendChild(newdiv);
                    chat.scrollTop = chat.scrollHeight;
                    msg.value='';

                }
            }
            catch(err){
                console.log(err);
            };

        }else{
            alert('Please enter a massage!');
        }
        
    
    });

}else{
    location.replace('login.html');
}