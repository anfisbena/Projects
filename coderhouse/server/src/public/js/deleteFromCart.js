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