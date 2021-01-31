const employeeController = require("../controllers/employeeController");

const app = (app) => {
  app.get("/api/:id", employeeController.getList);

  app.get("/api/employee/:id", employeeController.getEmployee);

  app.post("/api", employeeController.addEmployee);

  app.delete("/api/:id", employeeController.removeEmployee);

  app.put("/api/:id", employeeController.editEmployee);
  app.post("/api/auth/:id", employeeController.createUser);
};

module.exports = app;
