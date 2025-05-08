const express = require("express");

const app = express();

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
    { id: 10, name: "Rice", category: "Grain" }
  ];

  const cart = [];

  app.use(express.json());

  //Athenticate code
  app.use("/admin",(req,res,next)=>{
    const token = "abc";
    const access = token == "abc" ? 1:0
    if(access){
      next();
    }
    else{
      res.send("No Permission");
    }
  });

  app.get("/food",(req,res)=>{
    res.send(foods);
  });

  app.post("/admin",(req,res)=>{
    foods.push(req.body);
    res.send("Item added");
  });

  app.delete("/admin/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const foodid = foods.findIndex(info=> info.id === id);
    if(foodid!==-1){
      foods.splice(foodid,1);
      res.send("Deleted item sucessfully");
    }
    else{
      res.send("Not found");
    }
    console.log(foods);
  });

  app.put("/admin",(req,res)=>{
    const id = req.body.id;
    const food_id = foods.find(info=> info.id === id);
    food_id.name = req.body.name;
    food_id.category = req.body.category;
    res.send("Item updated");
    console.log(foods);
  });

  //user can add item in their cart 
  app.post("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const food = foods.find(info=> info.id===id);
    cart.push(food);
    res.send("Item added");
  });

  app.get("/user",(req,res)=>{
    res.send(cart);
  });

  app.delete("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const foodid = cart.findIndex(info=> info.id===id);
    if(foodid!==-1){
      cart.splice(foodid,1);
      res.send("Item deleted");
    }
    else{
      res.send("Not found");
    }
  });


app.listen(5000,()=>{
    console.log("Listening at port 5000");
});