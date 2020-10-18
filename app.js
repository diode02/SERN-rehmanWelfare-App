var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var categoriesRoutes = require("./routes/categories.routes");
var usersRouter = require("./routes/users.routes");
var customersRoutes = require("./routes/customers.routes");
var ordersRoutes = require("./routes/orders.routes");
var installmentsRoutes = require("./routes/installments.routes");
var productsRoutes = require("./routes/prodcuts.routes");
var receiptsRoutes = require("./routes/receipts.routes");
var app = express();

// const sequelize = require("./src/database/mysql");
// app.locals.sequelize = sequelize;
// global.mysequelize = sequelize;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/categories", categoriesRoutes);
app.use("/users", usersRouter);
app.use("/customers", customersRoutes);
app.use("/orders", ordersRoutes);
app.use("/installments", installmentsRoutes);
app.use("/products", productsRoutes);
// app.use("/receipts", receiptsRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
