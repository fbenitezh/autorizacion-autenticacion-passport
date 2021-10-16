import express from "express";
import cors from "cors";
import handlebars from "express-handlebars";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import AuthRouter from "./routes/auth.route.js";
import "./db.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.resolve() + "/src/views/layout",
  })
);
app.set("views", "./src/views");
app.set("view engine", ".hbs");
app.use(express.static("/src/views"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: Number(process.env.SESSION_EXPIRE),
    },
    rolling: true, //para que se renueve el maxage cada vez que hace una peticion
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", AuthRouter);

app.listen(8080, () => console.log("server on port 8080"));
