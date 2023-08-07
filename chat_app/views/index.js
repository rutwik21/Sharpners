

const token = localStorage.getItem("token");
const name = localStorage.getItem("name");



if(token){
    const msg = document.querySelector("#msg");
    const send = document.querySelector("button");
    const chat = document.querySelector("#chat");
    const enterid = document.querySelector('#enterid');
    const creategroup = document.querySelector('#creategroup');
    const connecttext = document.querySelector('#connecttext');
    const creategroupbtn = document.querySelector('#creategroupbtn');
    const enteridbtn = document.querySelector('#enteridbtn');
    const yourgrps = document.querySelector('#yourgrps');

    let selectedgrpid=localStorage.getItem('selectedgrpid');
    let grpin=[];

    
    

    enteridbtn.addEventListener('click',async ()=>{
        if(enterid.value!=''){

            if(Number(enterid.value) in grpin){
                alert('Already joined the group')
            }else{
                const res = await axios.get(`http://localhost:3000/group/getGroupById?groupId=${enterid.value}&userId=${token}`);
                console.log(res);
            }
            
        }else{
            alert('Please enter a valid group Id!')
        }
    });

    creategroupbtn.addEventListener('click',async ()=>{
        if(creategroup.value!=''){
            const res = await axios.post(`http://localhost:3000/group/createGroup`,{groupName : creategroup.value, createdBy : name, userId : token})
            location.reload();
        }else{
            alert('Please enter a Group name!')
        }
    })



    async function getGroups(){
        const res = await axios.get(`http://localhost:3000/group/getGroup?userId=${token}`);
        const joinedGroup=[];
        if(res.data.data){
            res.data.data.forEach(element=>{
                joinedGroup.push(element.group);
            });
            // localStorage.setItem('group',JSON.stringify(arr));
            
            joinedGroup.forEach(ele=>{
            grpin.push(Number(ele.id));

            const newdiv = document.createElement('div');
            const small = document.createElement('small');

                if(Number(ele.id)===Number(selectedgrpid)){
                    chat.removeChild(connecttext);
                    getChats(ele.id);
                    newdiv.className='card btn text-white bg-success p-1 card-subtitle m-1';
                }else{
                    newdiv.className='card btn btn-outline-secondary p-1 card-subtitle m-1';
                }
                small.className='grpname';

                newdiv.addEventListener('click',()=>{
                    localStorage.setItem('selectedgrpid',ele.id);
                    location.reload();
                })

                small.textContent=`id:${ele.id} ${ele.groupName}`;

                newdiv.appendChild(small);
                yourgrps.appendChild(newdiv);


            });
        }
        

    }
    getGroups();
    // const joinedGroup =JSON.parse(localStorage.getItem('group'));
    
    

    async function getChats(groupid){
        // var lschats = JSON.parse(localStorage.getItem(`chats${selectedgrpid}`));

        // if(lschats === null){
        //     var res = await axios.get(`http://localhost:3000/chat/getChat?chatId=${0}&groupId=${groupid}&userId=${token}`);
        //     var lastId = res.data.data.length - 10; 
        // }else{
            // var lastId = lschats[0].id;
            var res = await axios.get(`http://localhost:3000/chat/getChat?chatId=${0}&groupId=${groupid}&userId=${token}`);
        // }

        const arr =[]; 
            res.data.data.forEach(element => {

            // if (lschats===null && Number(element.id) > Number(lastId)){
            //     let obj = {id:element.id, name:element.name, massage:element.massage};
            //     arr.push(obj);
            //     localStorage.setItem(`chats${selectedgrpid}`,JSON.stringify(arr));
            // }
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
        
        

        // lschats.forEach(element=>{
        //     const newdiv = document.createElement('div');
        //     const small = document.createElement('small');
        //     const msgdiv = document.createElement('div');

        //     if(element.name === name){
        //         newdiv.className='card border-0 w-75 p-2 mb-2 bg-body-secondary float-end';
        //     }else{
        //         newdiv.className='card border-0 bg-body-secondary p-2 w-75 mb-2'
        //     }
            
        //     small.className='text-secondary';
        //     msgdiv.className='card-text';

        //     small.textContent=element.name;
        //     msgdiv.textContent=element.massage;
            
        //     newdiv.appendChild(small);
        //     newdiv.appendChild(msgdiv);
        //     chat.appendChild(newdiv);
        //     chat.scrollTop = chat.scrollHeight;
        // })

        
    
}


// getChats();
// lschats = JSON.parse(localStorage.getItem(`chats${selectedgrpid}`));
// setInterval(()=>{getChats(selectedgrpid)},1000);

send.addEventListener('click',async ()=>{
        event.preventDefault();

        if(msg.value != ''){

            const obj = {'userId':token,'groupId':selectedgrpid,'massage':msg.value,'name':name};
            try{
                const res = await axios.post("http://localhost:3000/chat/newChat",obj);
                if(res.data.success === true){

                    // if(lschats && lschats.length===10){
                    //     lschats.push({id:(lschats[lschats.length-1].id+1), name: name, massage: msg.value});
                    //     lschats.shift();
                    // }
                    // localStorage.setItem(`chats${selectedgrpid}`,JSON.stringify(lschats));
                    
                    
                    
                    
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