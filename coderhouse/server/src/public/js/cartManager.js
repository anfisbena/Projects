const deleteCartButtons = document.querySelectorAll('.deleteCartItem');
const checkoutButton=document.querySelector('.checkoutButton');
const table=document.querySelectorAll('.cartInfo');
let total = 0;
let arrayOrders=[]

table.forEach(tableValues => {
  let subtotal = 0;
  const quantityElements = tableValues.querySelectorAll('.quantity');
  const priceElements = tableValues.querySelectorAll('.price');

  priceElements.forEach((priceElement, index) => {
    const price = priceElement.getAttribute('value');
    const quantity = quantityElements[index].getAttribute('value');
    subtotal += price * quantity;
  });
  tableValues.querySelector('.subtotal').innerText = subtotal;
  total += subtotal;
});
document.querySelector('.total').innerText = `$ ${total}`;


deleteCartButtons.forEach(button => {
  button.onclick = async () => {
    const pid=button.getAttribute('pid');
    await fetch(`/cart/${encodeURIComponent(pid)}`,{
      method:"DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(x=>window.location.reload())
  }
});






checkoutButton.onclick=async()=>{
  table.forEach(tableValues => {
    const quantityElements = tableValues.querySelectorAll('.quantity')[0].outerText;

  })

  
  // await fetch(`/cart/checkout`,{
  //   method:"POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body:{
  //     cid:arrayOrders
  //   }
  // })
  // .then(x=>window.location.href='/cart')
}