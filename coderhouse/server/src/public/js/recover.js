const loginForm= document.getElementById('recoverForm');

loginForm.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const email=e.target.elements.email.value
  const password=e.target.elements.password.value
  const validatePassword=e.target.elements.validatePassword.value
  if(password!==validatePassword){
    alert("Contraseña no coincide")
    return
  }
  const obj={email,password};

  await fetch('/recover',{
    method:"POST",
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status===200){
      alert('Contraseña actualizada')
      window.location.href='/login'
    }
    else{
      alert('Error al actualizar contraseña')
    }
  })

})