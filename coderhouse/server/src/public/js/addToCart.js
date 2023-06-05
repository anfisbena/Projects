const addCartButtons = document.querySelectorAll('.addCartItem');

addCartButtons.forEach(button => {
  button.onclick = async () => {
    const qty=button.parentElement.querySelector('.qty').value;
    const pid=button.parentElement.querySelector('.qty').getAttribute('pid');
    const obj={pid,qty};
    await fetch('/cart',{
      method:"POST",
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.status===200){
        alert(data.payload)
      }
      else{
        alert('No se agregó el item, intenta otra vez')
      }
    })
  }
});