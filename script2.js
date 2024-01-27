document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories')
    let currentCategory = null;
    // const loadMoreBtn = document.getElementById('category-more')
    // loadMoreBtn.style.display = 'none';
    // let currPage = 1;

    // Fetched the list of categories from the API endpoint
    async function fetchCategory(){
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const category = await res.json()
        return category
    }

    // fetch each category dynamically
    async function fetchEachCategory(category){
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
        const eachCategory = await response.json()
        displayEachCategory(eachCategory)
    }
    

    function displayCategories(categories){
        categories.forEach((category, index) => {
            const catDiv = document.createElement('h3')
            catDiv.className = 'category'
            catDiv.innerText = category
            categoriesContainer.appendChild(catDiv)
            if (index === 0) {
                catDiv.style.color = 'rgba(16, 91, 229, 0.86)';
                currentCategory = catDiv;
                fetchEachCategory(category);
            }

            catDiv.addEventListener('click', () => {
                if (currentCategory) {
                    currentCategory.style.color = '';
                }
                fetchEachCategory(category); 
                catDiv.style.color = 'rgba(16, 91, 229, 0.86)';
                currentCategory = catDiv;
            });
        })
    }

    function displayEachCategory(products) {
        const container = document.getElementById('each_category')
        container.innerHTML = "";
        products.forEach(product => {
            const categoryDiv = document.createElement('div')
            categoryDiv.className = 'product-info'
            categoryDiv.innerHTML = `
            <div id="img_container">
            <img src=${product.image} alt=${product.title} id="product-image">
            </div>
            <h3 id="product-title">${product.title}</h3>
            <p id="product-description">${product.description}</p>
            <p id="product-price">$ ${product.price}</p>
            <p id="product-rating">${product.rating.rate} <span id="reviews">(${product.rating.count} reviews)</span></p>
            `
            container.appendChild(categoryDiv)
        })
    }

    fetchCategory().then(displayCategories)
    fetchEachCategory('electronics');
})

/*
  <div>electronics</div>
  <div>jewelry</div>
  <div>men's clothing</div>
  <div>women's clothing</div>
*/