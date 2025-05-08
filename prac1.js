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

const cart = [];

//Authenticate karna padega
app.use("/admin", (req, res, next) => {
  try {
    const token = "abc";
    const access = token == "abc" ? 1 : 0;
    if (access) {
      next();
    } else {
      res.send("No Permission");
    }
  } catch (err) {
    res.send("Error: ", err);
  }
});

app.get("/food", (req, res) => {
  try {
    res.send(foods);
  } catch (err) {
    res.send("Error : ", err);
  }
});

//Add
app.post("/admin", (req, res) => {
  try {
    foods.push(req.body);
    res.send("Item added");
  } catch (err) {
    res.send("Error : ", err);
  }
});

//Delete
app.delete("/admin/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const foodid = foods.findIndex((info) => info.id === id);
    if (foodid) {
      foods.splice(foodid, 1);
      res.send("Item deleted");
    } else {
      res.send("Item not found");
    }
  } catch (err) {
    console.log("Error Occured : ", err);
    res.status(500).send("Item not found");
  }
});

//Change
app.put("/admin", (req, res) => {
  try {
    const id = req.body.id;
    const foodid = foods.find((item) => item.id === id);
    if (foodid) {
      foodid.name = req.body.name;
      foodid.category = req.body.category;
      res.send("Sucessfully updated");
    } else {
      res.send("Not found");
    }
  } catch (err) {
    console.log("Error : ", err);
    res.send("Not found");
  }
});

//user
app.post("/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const foodid = foods.find((item) => item.id === id);
    if (foodid) {
      cart.push(foodid);
      res.send("Item added to your cart");
    } else {
      res.send("Item not found");
    }
  } catch (err) {
    res.send("Error : ", err);
  }
});

app.get("/user/food", (req, res) => {
  try {
    res.send(cart);
  } catch (err) {
    res.send("Error: ", err);
  }
});

app.delete("/user/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const foodid = cart.findIndex((info) => info.id === id);
    if (foodid) {
      cart.splice(foodid, 1);
      res.send("Item deleted");
    } else {
      res.send("Item is not in the cart");
    }
  } catch (err) {
    res.send("Error : ", err);
  }
});

app.listen(6000, () => {
  console.log("Listening at port 6000");
});
