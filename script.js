document.addEventListener('DOMContentLoaded', function () {
    const jsonUrl = 'https://s3.amazonaws.com/open-to-cors/assignment.json';
  
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        // Extract 'products' object from the JSON data
        const products = data.products;
  
        // Convert object to array for sorting
        const productList = Object.keys(products).map(key => ({
          id: key,
          ...products[key]
        }));
  
        // Sort the array by descending popularity
        productList.sort((a, b) => b.popularity - a.popularity);
  
        // Call function to generate table from sorted product list
        createTable(productList);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  });
  
  function createTable(productList) {
    const table = document.getElementById('data-table');
  
    // Create table header
    const headerRow = table.insertRow(0);
    const headerTitles = ['Title', 'Price'];
    headerTitles.forEach(title => {
      const th = document.createElement('th');
      th.textContent = title;
      headerRow.appendChild(th);
    });
  
    // Create table rows
    productList.forEach(product => {
      const row = table.insertRow();
      const titleCell = row.insertCell();
      const priceCell = row.insertCell();
  
      titleCell.textContent = product.title;
      priceCell.textContent = product.price;
    });
  }
  