const mongoose = require("mongoose");

const employeeController = {
  getList: async (req, res) => {
    const People = mongoose.model("employees");
    const people = await People.find({user:req.params.id});
    res.send(people);
  },
  getEmployee: async (req, res) => {
    const People = mongoose.model("employees");
    const people = await People.findById(req.params.id);
    console.log(people)
    res.send(people);
  },
  addEmployee: async (req, res) => {
    const People = mongoose.model("employees");
    const people = await new People(req.body).save();

    res.send(people);
  },

  removeEmployee: async (req, res) => {
    const People = mongoose.model("employees");
    const removed = await People.findByIdAndRemove(req.params.id);

    res.send(removed.id);
  },

  editEmployee: async (req, res) => {
    const People = mongoose.model("employees");
    const updated = await People.findByIdAndUpdate(req.params.id, req.body);

    res.send(updated);
  },
  createUser: async (req, res) => {
    const People = mongoose.model("user");
    const updated = await People.findOrCreate(
      { googleId: req.params.id },
      req.body
    );
    console.log(updated)
    res.send(updated);
  },
};

module.exports = employeeController;
