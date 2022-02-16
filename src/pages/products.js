import productTemplate from '../components/productTemplate.js';

export default async function productsPageTemplate () {
    const data = await fetch('./data/products.json').then(response => response.json());
    
    const productsList = document.createElement('ul');
    productsList.classList.add('products-list');
    data.map(product => (productsList.appendChild(productTemplate(product))));
    return productsList;
}
