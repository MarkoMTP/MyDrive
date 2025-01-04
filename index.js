const express = require("express");
const passport = require("passport");
const routes = require("./src/routes/routes");
const path = require("path");

// Session and Prisma
const session = require("express-session");
const PrismaSessionStore =
  require("@quixo3/prisma-session-store").PrismaSessionStore;
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const app = express(); // Declare app before using it
const prisma = new PrismaClient();

// Set the view engine to 'ejs'
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
