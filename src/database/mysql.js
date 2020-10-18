const { Sequelize } = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
sequelize = new Sequelize("rehman_test", "root", "khan01", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// var checkDataBaseConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };
// checkDataBaseConnection();

// module.exports = sequelize;
