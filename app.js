const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

const checkToken = (req,res,next) => {
    let {token} = req.query;
    if(token === "giveaccess"){
     next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
};


app.get("/api", checkToken, (req,res) => {
    res.send("data");
});

app.use("/random", (req,res,next) => {
    console.log("I'm only for random");
    next();
})

// Logger Function
// app.use((req,res,next) => {
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.pathname, req.hostname, req.time);
//     next();
// })

app.get("/", (req,res) => {
    res.send("Hello World");
})

app.get("/random", (req,res) => {
    res.send("this is a random page");  
});

// app.get("/err", (req,res) => {
//     abcd = abcd;
// });

// app.use((err, req, res, next) => {
//   let {statusCode = 500, message = "SOME ERROR OCCURED"} = err;
//   res.status(statusCode).send(message);
// });

const checkAccess = (req,res,next) => {
    let {access} = req.query;
    if(access === "giveAccessToAdmin") {
        next();
    }
    throw new ExpressError(403, "UNAUTHORIZED ACCESS");
}

// Admin Route
app.get("/admin",checkAccess, (req,res) => {
    res.send("some data : message");
});

app.use((err, req, res, next) => {
    let{status=403, messageS="UNAUTHORIZED ACCESS"} = err;
    res.status(status).send(message);
});

//404
app.use((req,res) => {
    res.status(404).send("Page Not Found");

})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});