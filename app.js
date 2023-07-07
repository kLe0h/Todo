const express = require("express");
const db = require("./routes/db-config");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 4000
const app = express();

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))


db.connect((err) => {
    if (err) throw err
    console.log("Database connected!");  
})

app.use("/", require("./routes/pages"))
app.use("/api", require("./controllers/auth"))


app.listen(PORT);