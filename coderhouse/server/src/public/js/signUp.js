const registerForm= document.getElementById('registerForm');

if(registerForm){
  registerForm.addEventListener('submit',async(e)=>{ 
    e.preventDefault();
    const password=e.target.elements.password.value
    const email=e.target.elements.email.value
    const first_name=e.target.elements.first_name.value
    const last_name=e.target.elements.last_name.value
    const obj={first_name,last_name,email,password};
    
    await fetch('/register',{
      method:"POST",
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.status)
      if(data.status===201){
        window.location.href='/login'
      }
      else{
        alert('Error al registrar usuario')
      }
    })
  })
  }