const addCartButtons = document.querySelectorAll('.deleteCartItem');

addCartButtons.forEach(button => {
  button.onclick = async () => {
    const pid=button.getAttribute('pid');
    await fetch(`/cart/${encodeURIComponent(pid)}`,{
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(x=>window.location.href='/cart')
  }
});

const table=document.querySelectorAll('.cartInfo');
table.forEach(tableValues=>{
  const price=tableValues.querySelector('.price').getAttribute('value')
  const quantity=tableValues.querySelector('.quantity').getAttribute('value')
  tableValues.querySelector('.subtotal').innerText=price*quantity;
})