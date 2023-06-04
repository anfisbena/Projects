document.querySelector('.addCartItem').onclick=async() => {
  const codeProduct=document.querySelector('.code').getAttribute('pid');
  const qtyInput =await document.querySelector('.qty').value;
  return console.log('product added' + codeProduct + qtyInput);
};