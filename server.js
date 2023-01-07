const express = require("express");
const app = express();

// Calling the express.json() method for parsing
app.use(express.json());

// An in-memory array to store the data
let products = [
  { id: 1, name: "Apple", price: 200 },
  { id: 2, name: "Banana", price: 70 },
  { id: 3, name: "Orange", price: 150 },
];

// A GET request to /products will return the array of products
app.get("/products", (req, res) => {
  res.send(products);
});

// A POST request to /products will add a new product to the array
app.post("/products", (req, res) => {
  // Read the request body to get the new product
  let newProduct = {
    id: 0,
   ...req.body
  };
  // Assign it a new id
  newProduct.id = products.length + 1;
  // Add it to the array
  products.push(newProduct);
  // Send the updated array back as the response
  res.status(201).json(products);
});

// A PUT request to /products/:id will update a product in the array
app.put("/products/:id", (req, res) => {
  // Read the request body to get the updated product
  let updatedProduct = {id:req.params.id, ...req.body};
  // Find the index of the product to be updated
  let index = products.findIndex((product) => product.id == req.params.id);
  // Replace the product at that index with the updated product
  products[index] = updatedProduct;
  // Send the updated array back as the response
  res.json(products);
});

// A DELETE request to /products/:id will delete a product from the array
app.delete("/products/:id", (req, res) => {
  // Find the index of the product to be deleted
  let index = products.findIndex((product) => product.id == req.params.id);
  // Remove the product at that index from the array
  products.splice(index, 1);
  // Send the updated array back as the response
  res.json(products);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
