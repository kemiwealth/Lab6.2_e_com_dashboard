


export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class DataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DataError";
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const relatedProducts: Product[] = [
  { id: 1, name: "Mouse", price: 20 },
  { id: 2, name: "Monitor", price: 80 },
];


export function fetchProductCatalog(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve([
          { id: 1, name: "Keyboard", price: 500 },
          { id: 2, name: "Headphones", price: 200 },
        ]);
      } else {
        reject("Failed to fetch product catalog");
      }
    }, 1000);
  });
}


export function fetchProductReviews(productId: number): Promise<string[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.75) {
        resolve(["Good product", "Excellent quality", "Worth the price"]);
      } else {
        reject(`Failed to fetch reviews for product ID ${productId}`);
      }
    }, 1500);
  });
}


export function fetchSalesReport(): Promise<{ totalSales: number; unitsSold: number; averagePrice: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.85) {
        resolve({
          totalSales: 150000,
          unitsSold: 450,
          averagePrice: 333.33,
        });
      } else {
        reject("Failed to fetch sales report");
      }
    }, 1000);
  });
}


fetchProductCatalog()
  .then(products => {
    console.log("Catalog:", products);
    return fetchProductReviews(products[0].id);
  })
  .then(reviews => {
    console.log("Reviews:", reviews);
    return fetchSalesReport();
  })
  .then(report => {
    console.log("Sales Report:", report);
  })
  .catch(error => console.error("Error:", error));
