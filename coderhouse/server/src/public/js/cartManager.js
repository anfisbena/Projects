const deleteCartButtons = document.querySelectorAll('.deleteCartItem');
const checkoutButton = document.querySelector('.checkoutButton');
const tableRows = document.querySelectorAll('.cartInfo');
let total = 0;
let arrayOrders = [];

tableRows.forEach(tableRow => {
  const quantityElement = tableRow.querySelector('.quantity');
  const quantity = quantityElement.getAttribute('value');
  const priceElement = tableRow.querySelector('.price');
  const price = priceElement.getAttribute('value');
  const pid = tableRow.querySelector('.pid').getAttribute('pid');
  const stock = tableRow.querySelector('.status').innerText;
  const subtotal = price * quantity;
  arrayOrders.push({pid,quantity,stock});
  tableRow.querySelector('.subtotal').innerText = subtotal;
  total += subtotal;
});
document.querySelector('.total').innerText = `$ ${total}`;

deleteCartButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const pid = button.getAttribute('pid');
    await fetch(`/cart/${encodeURIComponent(pid)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => window.location.reload());
  });
}); 

checkoutButton.onclick=async(e)=>{
  e.preventDefault();
  await fetch(`/cart/purchase`,{
    method:"POST",
    body:JSON.stringify(arrayOrders),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(x=>window.location.href='/cart')
}