document.querySelector('#add-to-cart').onclick=async() => {
  const qtyInput =await document.querySelector('.qty').value;
  const codeProduct=await document.querySelector('.code').value;
  return {qtyInput,codeProduct};
};