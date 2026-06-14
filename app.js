const express = require("express");
const app = express();

// app.use((req,res,next) => {
//     console.log("Hi I'm a 1st middleware");
//     next();
// });

// app.use((req,res,next) => {
//     console.log("Hi I'm a 2nd middleware");
//     next();
// });

const checkToken = (req,res,next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
     next();
    }
    throw new Error("ACCESS DENIED!");
};


app.get("/api", checkToken, (req,res) => {
    res.send("data");
});

app.use("/random", (req,res,next) => {
    console.log("I'm only for random");
    next();
})

app.use((req,res,next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.pathname, req.hostname, req.time);
    next();
})

app.get("/", (req,res) => {
    res.send("Hello World");
})

app.get("/random", (req,res) => {
    res.send("this is a random page");  
});

//404
app.use((req,res) => {
    res.status(404).send("Page Not Found");

})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});