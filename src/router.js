import productsPageTemplate from './pages/products.js';
import aboutPageTemplate from './pages/about.js';
import productPageTemplate from './pages/product.js';

function setActiveTab(page) {
    document.querySelectorAll('.js-route').forEach(item => item.classList.remove('selected'));
    const isProductPage = page.includes('product/');
    if (!isProductPage) {
        document.querySelectorAll('#' + page).forEach(item => item.classList.add('selected'));
    }
}

function getSelectedContent(page) {
    return new Promise((resolve) => {
        if (page === 'products') {
            productsPageTemplate().then((result) => {
                resolve(result);
            });
        } else if (page.includes('product/')) {
            productPageTemplate(page).then((result) => {
                resolve(result);
            });
        } else {
            const aboutPage = aboutPageTemplate();
            resolve(aboutPage);
        };
    });
}

function injectContent(page) {
    getSelectedContent(page).then(result =>
        document.querySelector('#content').innerHTML = result.outerHTML);
}

function getPageUrlFromData(data) {
    if (data.target) {
        return data.target.page;
    } else if (data.page) {
        return data.page;
    } else {
        return data;
    }
}

function push(data) {
    const page = getPageUrlFromData(data);
    window.history.pushState({ page }, `${page}`, `/${page}`);
    setActiveTab(page);
    injectContent(page);
}

function initializeContent() {
    const currentPageUrl = window.history.state;
    if (currentPageUrl !== null) {
        push(currentPageUrl);
    } else {
        push('products');
    }
}

function initializeClickEvents() {
    window['products'].addEventListener('click', event => push(event.target.id));
    window['about'].addEventListener('click', event => push(event.target.id));

    document.body.addEventListener('click', e => {
        e.preventDefault();
        const parentElement = e.target.parentElement;
        if (parentElement.classList.contains('js-switch-view-product')) {
            push(parentElement.getAttribute('href'));
        }

        const clickedLink = e.target;
        if (clickedLink.classList.contains('js-switch-view-home')) {
            push(clickedLink.getAttribute('href'));
        }
    });
}

window.onload = () => {
    initializeContent();
    initializeClickEvents();
}

window.addEventListener('popstate', event => {
    const statePage = event.state.page;
    setActiveTab(statePage);
    injectContent(statePage);
});
