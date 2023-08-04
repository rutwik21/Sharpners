
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

if(token){
const msg = document.querySelector("#msg");
const send = document.querySelector("button");
const chat = document.querySelector("#chat");


async function getChats(){
    var lschats = JSON.parse(localStorage.getItem("chats"));

    if(lschats === null){
        var res = await axios.get(`http://localhost:3000/chat/getChat?chatId=${0}`);
        var lastId = res.data.data.length - 10; 
    }else{
        var lastId = lschats[0].id;
        var res = await axios.get(`http://localhost:3000/chat/getChat?chatId=${lastId}`);
    }

    const arr =[]; 
    res.data.data.forEach(element => {

        if (lschats===null && element.id > lastId){
            let obj = {id:element.id, name:element.name, massage:element.massage};
            arr.push(obj);
            localStorage.setItem('chats',JSON.stringify(arr));
        }
        const newdiv = document.createElement('div');
        const small = document.createElement('small');
        const msgdiv = document.createElement('div');

        if(element.name === name){
            newdiv.className='card border-0 w-75 p-2 mb-2 bg-body-secondary float-end';
        }else{
            newdiv.className='card border-0 bg-body-secondary p-2 w-75 mb-2'
        }
        
        small.className='text-secondary';
        msgdiv.className='card-text';

        small.textContent=element.name;
        msgdiv.textContent=element.massage;
        
        newdiv.appendChild(small);
        newdiv.appendChild(msgdiv);
        chat.appendChild(newdiv);
        chat.scrollTop = chat.scrollHeight;
    });

    lschats.forEach(element=>{
        const newdiv = document.createElement('div');
        const small = document.createElement('small');
        const msgdiv = document.createElement('div');

        if(element.name === name){
            newdiv.className='card border-0 w-75 p-2 mb-2 bg-body-secondary float-end';
        }else{
            newdiv.className='card border-0 bg-body-secondary p-2 w-75 mb-2'
        }
        
        small.className='text-secondary';
        msgdiv.className='card-text';

        small.textContent=element.name;
        msgdiv.textContent=element.massage;
        
        newdiv.appendChild(small);
        newdiv.appendChild(msgdiv);
        chat.appendChild(newdiv);
        chat.scrollTop = chat.scrollHeight;
    })

    
    
}
getChats();
lschats = JSON.parse(localStorage.getItem("chats"));
// setInterval(()=>{getChats()},1000);

send.addEventListener('click',async ()=>{
        event.preventDefault();

        if(msg.value != ''){

            const obj = {'userId':token,'massage':msg.value,'name':name};
            try{
                const res = await axios.post("http://localhost:3000/chat/newChat",obj);
                if(res.data.success === true){

                    lschats.push({id:(lschats[lschats.length-1].id+1), name: name, massage: msg.value});
                    lschats.shift();
                    localStorage.setItem('chats',JSON.stringify(lschats));
                    
                    
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