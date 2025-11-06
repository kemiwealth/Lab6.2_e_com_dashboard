

import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const form = document.querySelector('form') as HTMLFormElement;
const productNameInput = document.getElementById('productName') as HTMLInputElement;
const productPriceInput = document.getElementById('productPrice') as HTMLInputElement;
const productList = document.getElementById('productList') as HTMLUListElement;

form?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  const newLi = document.createElement('li');
  newLi.textContent = `${productNameInput.value} - ${productPriceInput.value}`;
  productList?.appendChild(newLi)
});




import {
  fetchProductCatalog,
  fetchProductReviews,
  fetchSalesReport,
} from "./apiSimulator";

function runApp() {
  console.log("Starting API simulation...");

  fetchProductCatalog()
    .then((products) => {
      console.log("Product Catalog:");
      console.table(products);

      
      const reviewPromises = products.map((product) =>
        fetchProductReviews(product.id)
          .then((reviews) => {
            console.log(`\nReviews for ${product.name}:`);
            reviews.forEach((r) => console.log(`- ${r}`));
          })
          .catch((error) => console.error(`Error: ${error}`))
      );

      
      return Promise.all(reviewPromises);
    })
    .then(() => {
      
      return fetchSalesReport()
        .then((report) => {
          console.log("\nSales Report:");
          console.log(`Total Sales: $${report.totalSales}`);
          console.log(`Units Sold: ${report.unitsSold}`);
          console.log(`Average Price: $${report.averagePrice.toFixed(2)}`);
        })
        .catch((error) => console.error(`Error: ${error}`));
    })
    .catch((error) => {
      console.error(`Error fetching product catalog: ${error}`);
    })
    .finally(() => {
      console.log("\nAll API calls attempted.");
    });
}

runApp();
