const loginForm= document.getElementById('recoverForm');

loginForm.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const email=e.target.email.value;
  await fetch(`/recover`,{
    method:'POST',
    body:JSON.stringify({email}),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.user.status===200){
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado ',
        text: `porfavor revisa tu correo para mas instrucciones`
      })
    .then(()=>window.location.href='/login')      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Correo no existe',
        text: `intenta escribiendo tu correo nuevamente`
      })
    }
  })
  .catch(err=>console.log(err))
})
