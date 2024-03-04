require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');
// const port = process.env.PORT || 5000;
const path = require('path');

// Connexion à la DB 
connectDB();

const app = express();


// Middleware qui permet de traiter les données de la Request 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors());

app.use("/post", require("./routes/post.routes"));
app.use("/travel", require("./routes/routeTravel"));
app.use("/user", require("./routes/routeUser"));


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,'../build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Api running");
    });
}


// Lancer le serveur
app.listen(process.env.PORT, () => console.log("Le serveur a démarré au port " + process.env.PORT));
console.log(process.env.PORT);
// console.log(path.join( ));