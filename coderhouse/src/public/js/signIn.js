  const loginForm= document.getElementById('loginForm');

if(loginForm){
loginForm.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const email=e.target.elements.email.value
  const password=e.target.elements.password.value
  const obj={email,password};
  await fetch('/login',{
    method:"POST",
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status===200){
      window.location.href='/'
    }
    else{
      alert('Error al iniciar sesión')
    }
  })
  
})
}