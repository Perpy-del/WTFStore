document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories')
    let currPage = 1;
    let catIndex = 0;

    // Fetched the list of categories from the API endpoint
    async function fetchCategory(){
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const category = await res.json()
        return category
    }

    // fetch each category dynamically
    async function fetchEachCategory(category){
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=3&page=${currPage}`)
        const eachCategory = await response.json()
        displayEachCategory(eachCategory)
    }

    function displayCategories(categories){
        categories.forEach(category => {
            const catDiv = document.createElement('div')
            catDiv.className = 'category'
            catDiv.innerText = category
            categoriesContainer.appendChild(catDiv)
            catDiv.addEventListener('click', () => fetchEachCategory(category));
        })
    }

    function displayEachCategory(products) {
        const container = document.getElementById('each_category')
        container.innerHTML = "";
        products.forEach(product => {
            const productDIv = document.createElement('div')
            productDIv.className = 'product-info'
            productDIv.innerHTML = `
            <img src=${product.image} alt=${product.title} id="product-image">
            <h3 id="product-title">${product.title}</h3>
            <p id="product-description">${product.description}</p>
            <p id="product-price">$ ${product.price}</p>
            <p id="product-category">${product.category}</p>
            <p id="product-rating">${product.rating.rate} (${product.rating.count} reviews)</p>
            `
            container.appendChild(productDIv)
        })
    }

    fetchCategory().then(displayCategories)
})

/*
  <div>electronics</div>
  <div>jewelry</div>
  <div>men's clothing</div>
  <div>women's clothing</div>
*/