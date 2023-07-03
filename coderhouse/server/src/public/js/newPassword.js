const passwordForm=document.getElementById('passwordReset');

passwordForm.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const password1=e.target.password1.value;
  const password2=e.target.password2.value;
  if(password1!==password2){
    Swal.fire({
      icon: 'error',
      title: 'Contraseñas no coinciden',
      text: `intenta escribir nuevamente tu contraseña`
    })
  }
  else{
    const token=window.location.href.split('/')[4]
    const result=await fetch(`/recover/${token}`,{
      method:'PUT',
      body:JSON.stringify({password:password1}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const resJson=await result.json()
    if(resJson.status===200){
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: `${resJson.message}`
      })
      .then(()=>window.location.href='/login')      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${resJson.message}`
      })
    }
  }
})