
const socket = io('https://34.207.207.120:4000');
socket.on('connect',()=>{
    console.log('connected')
})

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
    const grpmembers = document.querySelector('#grpmembers');
    const addMembers = document.querySelector('#addMembers');
    
    const foradmin = document.getElementById('foradmin');
    const parentnode = foradmin.parentNode;
    parentnode.removeChild(foradmin)

    



    let selectedgrpid=localStorage.getItem('selectedgrpid');
    const grpin={};

    enteridbtn.addEventListener('click',async ()=>{
        if(enterid.value!=''){

            if(Number(enterid.value) in grpin){
                alert('Already joined the group');
            }else{
                const res = await axios.get(`https://34.207.207.120:4000/group/getGroupById?groupId=${enterid.value}&userId=${token}`);
                location.reload();
            }
            
        }else{
            alert('Please enter a valid group Id!')
        }
    });

    creategroupbtn.addEventListener('click',async ()=>{
        if(creategroup.value!=''){
            const res = await axios.post(`https://34.207.207.120:4000/group/createGroup`,{groupName : creategroup.value, createdBy : name, userId : token})
            location.reload();
        }else{
            alert('Please enter a Group name!')
        }
    })



    async function getGroups(){
        const res = await axios.get(`https://34.207.207.120:4000/group/getGroup?userId=${token}`);
        

        let joinedGroup=[];
        if(res.data.data){
            res.data.data.forEach(element=>{
                element.data.admin = element.admin;
                joinedGroup.push(element.data);
            });
            localStorage.setItem('group',JSON.stringify(joinedGroup));
            
            joinedGroup.forEach(ele=>{
                const id =ele.id;
                const admin = ele.admin;
                grpin[id] = admin;

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

    if(selectedgrpid){
        socket.emit('joined-grp',selectedgrpid);

        if(grpin[selectedgrpid]===true){
            parentnode.appendChild(foradmin);

            const searchname = document.getElementById('searchname');
            const searchbtn = document.getElementById('searchbtn');

            searchbtn.addEventListener('click',async ()=>{
                if(searchname.value!=''){
                    const phone = searchname.value
                    const obj={phone:phone,groupId:selectedgrpid}
                    const res = await axios.post(`https://34.207.207.120:4000/admin/searchMember`,obj);
                    if(res.data.data){
                        const id = res.data.data.id;
                        const newdiv = document.createElement('div');
                        const namediv = document.createElement('div');
                        const add = document.createElement('button');

                        newdiv.className="btn-group-sm mb-1 text-center";
                        namediv.className="btn disabled border-0 fw-bold";
                        add.className="btn btn-sm btn-success";

                        namediv.textContent=res.data.data.name;
                        add.textContent='Add';

                        add.addEventListener('click',async()=>{
                            const obj = {userId:id,groupId:selectedgrpid}
                            const result = await axios.post(`https://34.207.207.120:4000/admin/addMember`,obj);
                            
                            location.reload();
                        });

                        newdiv.appendChild(namediv);
                        newdiv.appendChild(add);
                        addMembers.appendChild(newdiv);


                    }else{
                        alert('Invalid or already joined the group');
                    }
                    // if(Number(enterid.value) in grpin){
                    //     
                    // }else{
                        
                    //     location.reload();
                    // }
                    
                }else{
                    alert('Please enter a number to search!')
                }
            });



            const res = await axios.get(`https://34.207.207.120:4000/admin/getGroupMembers?groupId=${selectedgrpid}&userId=${token}`);
            res.data.data.forEach(ele=>{
                

                const newdiv = document.createElement('div');
                const namediv = document.createElement('div');
                const makeadmin = document.createElement('button');
                const remove = document.createElement('button');
                
                if(ele.admin===true){
                    makeadmin.className = "btn btn-sm btn-success opacity-75 disabled";
                    makeadmin.textContent='Admin';
                    remove.textContent='Exit';
                }else{
                    makeadmin.className = "btn btn-sm btn-success";
                    makeadmin.textContent='Make admin';
                    remove.textContent='Remove';

                    makeadmin.addEventListener('click',async()=>{
                        const obj = {groupId:selectedgrpid,userId:ele.id};
                        await axios.post(`https://34.207.207.120:4000/admin/makeAdmin`,obj);
                        location.reload();
                    });

                    

                }
                remove.addEventListener('click',async()=>{
                    const obj = {groupId:selectedgrpid,userId:ele.id};
                    await axios.post(`https://34.207.207.120:4000/admin/removeMember`,obj);
                    location.reload();
                });


                newdiv.className = "btn-group-sm mb-1 text-center";
                namediv.className = "btn disabled border-0 fw-bold";
                
                remove.className = "btn btn-sm btn-danger";

                namediv.textContent=ele.name;
                
                

                newdiv.appendChild(namediv);
                newdiv.appendChild(makeadmin);
                newdiv.appendChild(remove);
                grpmembers.appendChild(newdiv);

            });
        }
    }

    

    }
    getGroups();
    // const joinedGroup =JSON.parse(localStorage.getItem('group'));
    
    socket.on('recive-msg',(msg,name)=>{
        const newdiv = document.createElement('div');
            const small = document.createElement('small');
            const msgdiv = document.createElement('div');

            newdiv.className='card border-0 bg-body-secondary p-2 w-75 mb-2'
            
            small.className='text-secondary';
            msgdiv.className='card-text';

            small.textContent=name;
            msgdiv.textContent=msg;
            
            newdiv.appendChild(small);
            newdiv.appendChild(msgdiv);
            chat.appendChild(newdiv);
            chat.scrollTop = chat.scrollHeight;
    })
    

    async function getChats(groupid){
        // var lschats = JSON.parse(localStorage.getItem(`chats${selectedgrpid}`));

        // if(lschats === null){
        //     var res = await axios.get(`https://34.207.207.120:4000/chat/getChat?chatId=${0}&groupId=${groupid}&userId=${token}`);
        //     var lastId = res.data.data.length - 10; 
        // }else{
            // var lastId = lschats[0].id;
            var res = await axios.get(`https://34.207.207.120:4000/chat/getChat?chatId=${0}&groupId=${groupid}&userId=${token}`);
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

            socket.emit('send-msg',msg.value,selectedgrpid,name);

            const obj = {'userId':token,'groupId':selectedgrpid,'massage':msg.value,'name':name};
            try{
                const res = await axios.post("https://34.207.207.120:4000/chat/newChat",obj);
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