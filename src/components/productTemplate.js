export default function productTemplate(product) {
  const productsItem = document.createElement('li');
  productsItem.classList.add('products-item');
  productsItem.innerHTML =
    `<a class='js-switch-view-product' href='product/${product.id}'>
        <img src=${product.thumbnail} alt=${product.name} />
        <p class='products-name'>${product.name}</p>
        <p class='products-price'>${product.price} ${product.currency}</p>
    </a>`;

  return productsItem;
}