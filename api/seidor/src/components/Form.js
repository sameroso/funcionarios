import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveEmployee } from "../actions";
import "react-toastify/dist/ReactToastify.css";

const FormContainer = styled.form`
  width: 100%;
  margin: auto;
`;

const FormInput = styled.input`
  margin-bottom: 1rem;
  display: block;
  height: 2rem;
  border-radius: 5px;
  width: 100%;
`;

export default function Form() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    salario: "",
    desconto: "",
    dependentes: "",
  });
  const google = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { push } = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await axios.put(`/api/${id}`, form);
        push("/");
        return toast.success("sucesso");
      } catch {
        return toast.warning("falha");
      }
    }
    try {
      dispatch(saveEmployee(form, google.current));
      push("/");
      return toast.success("sucesso");
    } catch {
      return toast.warning("falha");
    }
  };

  useEffect(() => {
    async function getParams() {
      if (id) {
        const employee = await axios.get(`/api/employee/${id}`);
        setForm(employee.data);
      }
      const userGoogleId = await localStorage.getItem("userGoogleId");
      google.current = userGoogleId;
    }
    getParams();
  }, []);

  return (
    <FormContainer onSubmit={submitForm}>
      <FormInput
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <FormInput
        value={form.cpf}
        onChange={(e) => setForm({ ...form, cpf: e.target.value })}
      />
      <FormInput
        value={form.salario}
        onChange={(e) => setForm({ ...form, salario: e.target.value })}
        type="number"
      />
      <FormInput
        value={form.desconto}
        onChange={(e) => setForm({ ...form, desconto: e.target.value })}
        type="number"
      />
      <FormInput
        value={form.dependentes}
        onChange={(e) => setForm({ ...form, dependentes: e.target.value })}
        type="number"
      />
      <button type="submit"> submit</button>
    </FormContainer>
  );
}
