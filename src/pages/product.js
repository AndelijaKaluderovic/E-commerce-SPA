export default async function productPageTemplate(page) {
    const id = page.split('/')[1];
    const productData = await fetch(`../data/${id}.json`).then(response => response.json());
    const productItem = document.createElement('section'); 
    productItem.classList.add('product');

    productItem.innerHTML =`
        <div class='product-img'>
            <img src='/images/${productData.id}.jpg' alt=${productData.name} />
        </div>
        <div class='product-details'>
            <p class='product-name'>${productData.name}</p>
            <p class='product-description'>${productData.description}</p>
            <p class='product-price'>${productData.price} ${productData.currency}</p>
            <form>
                <label for='color'>Color: </label> 
                <select name='color' id='color'> 
                    <option>White</option>
                    <option>Blue</option>
                    <option>Red</option>
                    <option>Black</option>
                </select>
                <label for='size'>Size:</label>
                <select name='size' id='size'>
                    <option>37</option>
                    <option>38</option>
                    <option>39</option>
                    <option>40</option>
                    <option>41</option>
                    <option>41</option>
                    <option>42</option>
                    <option>43</option>
                    <option>44</option>
                    <option>45</option>
                </select>
            </form>
            <div class='buttons'>
                <button class='btn-add' type='submit'>Add to cart</button>
                <a href='products' class='js-switch-view-home btn-back'>Back to home</a>
            </div>
        </div>`
    
    return productItem;
}