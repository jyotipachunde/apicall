const dd=document.getElementById("dd");
const titlec=document.getElementById("title");
const Contentc=document.getElementById("content");
const userIdc=document.getElementById("userid");
const btnsub=document.getElementById("btnsub");
const btnup=document.getElementById("btnup");
const ff=document.getElementById("ff");


function snackbar(title,text,icon){
  swal.fire({
        title,
        text,
        icon,
        timer:3000
    });
}

let cl=console.log;
let BASE_URL=`https://jsonplaceholder.typicode.com`;
let POST_URL=`${BASE_URL}/posts`;
cl(POST_URL);


function createcard(arr){
  let res='';
  res+=arr.map(post=>{
    return`<div class="card mt-3 shadow-rounded" id="${post.id}">
             <div class="card-header">
                ${post.title}
                </div>
                <div class="card-body">
                ${post.body}</div>
                <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary" onclick="onedit(this)">edit</button>
                    <button type="button" class="btn btn-outline-danger" onclick="onremove(this)">delete</button>
                </div>
            </div>`
  }).join('');
  cl(res);
  ff.innerHTML=res;
}
//createcard();

function onremove(ele){
  Swal.fire({
    title:'do you want to remove the post',
    showCancelButton:true,
    confirmButtonText:'remove'
  }).then(result=>{
  if(result.isConfirmed){
     let remov=ele.closest('.card').id;
  cl(remov);
  let remove_url=`${POST_URL}/${remov}`;
  let xhr=new XMLHttpRequest;
  xhr.open('DELETE',remove_url);
  xhr.onload=function(){
    if(xhr.status>=200 && xhr.status<300){
      let res=xhr.response;
      cl(res);
      ele.closest('.card').remove();
      snackbar('deleted','card is deleted successfully','success');
    }else{
          snackbar('wrong','something went wrong','error');

    }
  }
  xhr.send(null);
  }
  })
}

function onedit(ele){
  let editid=ele.closest('.card').id;
  cl(editid);
  localStorage.setItem('editid',editid);

   let edit_url=`${POST_URL}/${editid}`;
   cl(edit_url);
  let xhr=new XMLHttpRequest;
   xhr.open('GET',edit_url) ;

   xhr.onload=function(){
    if(xhr.status>=200 && xhr.status<300){
      let res=JSON.parse(xhr.response);
      cl(res);
       titlec.value=res.title,
       Contentc.value=res.body,
       userIdc.value=res.userid
       btnsub.classList.add('d-none');
       btnup.classList.remove('d-none');
    }else{
       snackbar('wrong','something went wrong','error');
    }
   }
   xhr.send(null);
}


function fetchallposts(){
  //create new insatance
 let xhr=new XMLHttpRequest();

 //configuration>> by using  open method
 xhr.open('GET' ,POST_URL);
 xhr.setRequestHeader('auth','token from LS');

 //onload
xhr.onload=function(){
  cl(xhr.readyState);
  if(xhr.status>=200&& xhr.status<300){
    let data=JSON.parse(xhr.response)
    cl(data);
    createcard(data);

    //templating

  }
}

//request to backend
xhr.send(null);
}
fetchallposts();

const onsubmit=(eve)=>{
  eve.preventDefault();

  //obj
  let ob={
    title:titlec.value,
    body:Contentc.value,
    userid:userIdc.value
  };
  cl(ob);
  dd.reset();


  let xhr=new XMLHttpRequest();

  xhr.open('POST',POST_URL);


  xhr.onload=function(){
    if(xhr.status===201){
    let re=JSON.parse(xhr.response)
    cl(re);
    //createcard(data);
    let card=document.createElement('div');
    card.className='card mt-3 shadow-rounded';
    card.id=re.id;
    card.innerHTML=` <div class="card-header">
                ${ob.title}
                </div>
                <div class="card-body">
                ${ob.body}</div>
                <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary" onclick="onedit(this)>edit</button>
                    <button type="button" class="btn btn-outline-danger" onclick="onremove(this)>delete</button>
                </div>`;

      ff.append(card);
      snackbar('created','card is created successfully','success');
  }
  else{
    d='no no';
    cl(d);
  }

  }
  xhr.send(JSON.stringify(ob));

}

function onupdate(){
  let upid=localStorage.getItem('editid');
  cl(upid);
  let upob={
       title:titlec.value,
       body:Contentc.value,
       userid:userIdc.value,
       id:upid
  }
    cl(upob);
  dd.reset();
  btnsub.classList.remove('d-none');
  btnup.classList.add('d-none');

  let xhr=new XMLHttpRequest();

  update_url=`${POST_URL}/${upid}`;
      cl(update_url);

  xhr.open('PATCH',update_url);
  xhr.onload=function(){
     if(xhr.status>=200){
    let res=JSON.parse(xhr.response)
    cl(res);
    let card=document.createElement('div');
    card.className='card mt-3 shadow-rounded';
    card.id=res.upid;
    card.innerHTML=` <div class="card-header">
                ${upob.title}
                </div>
                <div class="card-body">
                ${upob.body}</div>
                <div class="card-footer d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary" onclick="onedit(this)>edit</button>
                    <button type="button" class="btn btn-outline-danger" onclick="onremove(this)>delete</button>
                </div>`;

      ff.append(card);

      snackbar('updated','card is updated successfully','success');
     }
     else{
            snackbar('wrong','soething went wrong','error');

     }


  }
    xhr.send(JSON.stringify(upob));


}




dd.addEventListener('submit',onsubmit);
btnup.addEventListener('click',onupdate)






/*fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((json) => console.log(json));


  fetch('https://jsonplaceholder.typicode.com/posts/2', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));

  fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  body: JSON.stringify({
    title: 'foo',
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));


  fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
});*/