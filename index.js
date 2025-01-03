"set up express, authentication ecc";
const express = require("express");
const passport = require("passport");
// const authRoutes = require("./auth");
// const routes = require("./routes");

//session
const session = require("express-session");
const PrismaSessionStore =
  require("@quixo3/prisma-session-store").PrismaSessionStore;
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // Prune expired entries every 2 mins
    }),
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
