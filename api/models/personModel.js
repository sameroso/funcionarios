const mongoose = require("mongoose");

const { Schema } = mongoose;

const Employeechema = new Schema({
  nome: String,
  cpf: String,
  salario: Number,
  desconto: Number,
  dependentes: Number,
  user: String,
});

mongoose.model("employees", Employeechema);
