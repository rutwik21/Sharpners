const isPremiumUser = localStorage.getItem('isPremiumUser');
        const token = localStorage.getItem('token');

        const form_container = document.getElementById('form_container');

        if(token){
            if(isPremiumUser === 'true'){
                const LeaderboardBody = document.getElementById('LeaderboardBody');
                const LeaderboardHead = document.getElementById('LeaderboardHead');

                const showLeaderboard = document.createElement('button');
                const downloadReport = document.createElement('button');

                showLeaderboard.className = "btn btn-outline-primary mt-2";
                showLeaderboard.textContent = "Show Leaderboard";

                downloadReport.className = "btn btn-outline-primary mt-2";
                downloadReport.textContent = "Download Report";

                downloadReport.addEventListener('click',async()=>{
                    
                    await axios.get("http://3.90.229.193/expence/download",{headers : {'Auth' : token}}).then((response)=>{
                       console.log(response);
                        if(response.status === 201){
                            
                            //the bcakend is essentially sending a download link
                            //  which if we open in browser, the file would download
                            var a = document.createElement("a");
                            a.href = response.data.fileUrl;
                            a.download = 'MyData.csv';
                            a.click();
                        } else {
                            throw new Error(response.data.message)
                        }
                    })
                   
                });

                showLeaderboard.addEventListener('click', async()=>{
                    LeaderboardBody.innerHTML='';
                    LeaderboardHead.innerHTML='';
                    const h3 = document.getElementById('h3');
                    const nameth = document.createElement('th');
                    const totalAmountth = document.createElement('th');

                    h3.className = "text-dark text-center";
                    h3.textContent = 'Leaderboard';
                    nameth.textContent = 'Name'; 
                    totalAmountth.textContent = 'Total Amount';

                    LeaderboardHead.appendChild(nameth);
                    LeaderboardHead.appendChild(totalAmountth);

                    const res = await axios.get("http://3.90.229.193/premium/showLeaderboard",{headers : {'Auth' : token}});
                    
                    res.data.forEach(data =>{
                        
                        const tr = document.createElement('tr');
                        const td1 = document.createElement('td');
                        const td2 = document.createElement('td');

                        td1.textContent = data.name;
                        if(data.totalExpence != null){
                            td2.textContent = data.totalExpence;
                        }else{
                            td2.textContent = 0;
                        }
                        
                        tr.appendChild(td1);
                        tr.appendChild(td2);

                        LeaderboardBody.appendChild(tr);

                    });
                    
                });

                form_container.appendChild(showLeaderboard);
                form_container.appendChild(downloadReport);


            }else{

                const buyPremium = document.createElement('button');
                buyPremium.className = "btn btn-outline-primary mt-2";
                buyPremium.textContent = "Buy Premium";

                buyPremium.addEventListener('click',async (e)=>{
                    const res = await axios.get("http://3.90.229.193/purchase/primiumMembership",{headers : {'Auth' : token}});
                    var options = {
                        "key" : res.data.key_id,
                        "order_id" : res.data.order.id,
                        "handler" : async function (responce) {
                            await axios.post("http://3.90.229.193/purchase/updateStatus",{
                                orderId : options.order_id,
                                paymentId : responce.razorpay_payment_id
                            },{ headers : {'Auth' : token}})
                            localStorage.setItem('isPremiumUser', true);
                            location.reload();
                        }
                    };
                    const rzp1 = new Razorpay(options);
                    rzp1.open();
                    e.preventDefault();

                    rzp1.on('payment.failed', function(responce){
                        console.log(responce);
                        alert("somthing went wrong!")
                    })
                } );

                form_container.appendChild(buyPremium);
            }

            function changeRows(value){
                localStorage.setItem('rowsPerPage',value)
                location.reload();
            }




            const amount = document.querySelector("#amount");
            const income = document.querySelector('#income');
            const expence = document.querySelector('#expence');
            const description = document.querySelector("#description");
            const category = document.querySelector("#category");
            const tbody = document.getElementById('tbody');
            const submit = document.querySelector("#submit");
            const showbtn = document.querySelector('#showbtn');
            const previous = document.querySelector('#previous');
            const rowsPerPage =Number(localStorage.getItem('rowsPerPage')) ;
            

            submit.addEventListener('click',async ()=>{
                event.preventDefault();
                let obj;
                if(expence.checked){
                    obj = {'amount':amount.value,'description':description.value,'category':category.value,'type': expence.value,'token': token};
                }else{
                    obj = {'amount':amount.value,'description':description.value,'category':category.value,'type':income.value, 'token': token};
                }
                
                try{
                    const res = await axios.post("http://3.90.229.193/expence/addExpence",obj);
                    display(1);
                }
                catch(err){console.log(err)};

            });

            async function display(page){
                let res;

                if(rowsPerPage>=5){
                    res = await axios.get(`http://3.90.229.193/expence/getExpence?page=${page}&limit=${rowsPerPage}`, { headers : {'Auth' : token}});
                }else{
                    res = await axios.get(`http://3.90.229.193/expence/getExpence?page=${page}&limit=10`, { headers : {'Auth' : token}});
                }
                tbody.innerHTML='';
                showbtn.innerHTML='';
                previous.innerHTML='';
                
                if(res.data.hasNext){
                    
                    const showMore = document.createElement('button');
                    showMore.textContent="Next";
                    showMore.className="btn btn-outline-dark ";
                    showMore.addEventListener('click',()=>{
                        display(page+1);
                    });
                    showbtn.appendChild(showMore);
                }
                
                if(res.data.hasPrevious){
                    
                    const showLessbtn = document.createElement('button');
                    showLessbtn.textContent="Previous";
                    showLessbtn.className="btn btn-outline-dark ";
                    showLessbtn.addEventListener('click',()=>{
                        display(page-1);
                    });
                    previous.appendChild(showLessbtn);
                }
                
                
                const total = document.createElement('tr');
                const td7 = document.createElement('td');
                const td8 = document.createElement('td');
                const td9 = document.createElement('td');
                const totalIncome = document.createElement('td');
                const totalExpence = document.createElement('td');
                const remaining = document.createElement('td');

                totalIncome.textContent='0';
                totalExpence.textContent='0';
                remaining.textContent='0';



                    res.data.data.forEach(data => {
                        const tr = document.createElement('tr');
                        const td1 = document.createElement('td');
                        const td2 = document.createElement('td');
                        const td3 = document.createElement('td');
                        const td4 = document.createElement('td');
                        const td5 = document.createElement('td');
                        const td6 = document.createElement('td');
                        
                        const deleteBtn = document.createElement('button');

                        deleteBtn.className = 'btn btn-danger btn-sm';
                        deleteBtn.textContent='Delete';
                        
                        if(data.type === 'income'){
                            td4.textContent = `${data.amount}`
                            td5.textContent = `-`
                            tr.className='bg-success-subtle';
                            totalIncome.textContent = Number(totalIncome.textContent)+Number(data.amount);
                            deleteBtn.addEventListener('click',async ()=>{
                                try{
                                    await axios.delete(`http://3.90.229.193/expence/deleteExpence/${data.id}`);
                                    totalIncome.textContent = Number(totalIncome.textContent)-Number(data.amount);
                                    remaining.textContent =Number(totalIncome.textContent)-Number(totalExpence.textContent);
                                    tbody.removeChild(tr);
                                    
                                }catch(err){console.log(err)};
                            });
                        }else{
                            td5.textContent=`${data.amount}`
                            td4.textContent = `-`
                            tr.className='bg-danger-subtle';
                            totalExpence.textContent =Number(totalExpence.textContent)+Number(data.amount);
                            deleteBtn.addEventListener('click',async ()=>{
                                try{
                                    await axios.delete(`http://3.90.229.193/expence/deleteExpence/${data.id}`);
                                    totalExpence.textContent =Number(totalExpence.textContent)-Number(data.amount);
                                    remaining.textContent =Number(totalIncome.textContent)-Number(totalExpence.textContent);
                                    tbody.removeChild(tr);
                                    
                                    
                                }catch(err){console.log(err)};
                            });
                        }
                        console.log();

                        td1.textContent=`${data.createdAt.split('T')[0]}`; 
                        td2.textContent=`${data.description}`; 
                        td3.textContent=`${data.category}`; 
                        td6.appendChild(deleteBtn);
                        remaining.textContent =Number(totalIncome.textContent)-Number(totalExpence.textContent);

                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        
                        tbody.appendChild(tr);
                        
                        
                    });

                totalIncome.className='bg-success bg-opacity-75 rounded-start text-white';
                totalExpence.className='bg-danger bg-opacity-75 text-white';
                remaining.className='bg-primary rounded-end text-white';
                total.className='bg-gradient'

                total.appendChild(td7);
                total.appendChild(td8);
                total.appendChild(td9);
                total.appendChild(totalIncome);
                total.appendChild(totalExpence);
                total.appendChild(remaining);
                if(tbody.hasChildNodes()){
                    tbody.appendChild(total);
                }
                
            };
            display(1);


        }
        else{location.replace('Login.html')}