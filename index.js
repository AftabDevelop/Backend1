const express = require("express");

const app = express();

app.use(express.json());

const foods = [
  { id: 1, name: "Apple", category: "Fruit" },
  { id: 2, name: "Broccoli", category: "Vegetable" },
  { id: 3, name: "Chicken", category: "Meat" },
  { id: 4, name: "Salmon", category: "Fish" },
  { id: 5, name: "Milk", category: "Dairy" },
  { id: 6, name: "Cheese", category: "Dairy" },
  { id: 7, name: "Banana", category: "Fruit" },
  { id: 8, name: "Carrot", category: "Vegetable" },
  { id: 9, name: "Beef", category: "Meat" },
  { id: 10, name: "Rice", category: "Grain" },
];

//user cart
const cart = [];

//Authenticate
app.use("/admin", (req, res, next) => {
  const token = "abcd";
  const access = token == "abcd" ? 1 : 0; //if-else condition hai agar hai to 1 nahi to 0
  if (access) {
    next();
  } else {
    res.send("No permission");
  }
});

app.get("/food", (req, res) => {
  res.send(foods);
});

app.post("/admin", (req, res) => {
  foods.push(req.body);
  res.send("Added items");
  res.status(401).send("No premission");
});

app.delete("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const food_id = foods.findIndex((info) => info.id === id);
  if (food_id !== -1) {
    foods.splice(food_id, 1);
    res.send("Deleted Item");
  } else {
    res.send("Item not found");
  }
});

app.put("/admin", (req, res) => {
  const id = req.body.id;
  const foodid = foods.find((info) => info.id === id);

  if (foodid) {
    // If the food item is found, update its properties
    foodid.name = req.body.name;
    foodid.category = req.body.category;
    res.send("Updated data successfully");
  } else {
    // If the food item is not found, send a 404 response
    res.status(404).send("Item not found");
  }
});

//user can add item in their cart
app.post("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foodid = foods.find((info) => info.id === id);
  if (foodid != -1) {
    cart.push(foodid);
    res.send("Item added");
  } else {
    res.send("Item not found");
  }
});

//view
app.get("/user/food", (req, res) => {
  res.send(cart);
});

//delete
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foodid = cart.findIndex((info) => info.id === id);
  if (foodid !== -1) {
    cart.splice(foodid, 1);
    res.send("Item deleted");
  } else {
    res.send("Item not found");
  }
});

app.listen(5000, () => {
  console.log("Listening at port 5000");
});
