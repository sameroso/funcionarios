import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { saveEmployee } from "../actions";
import validateForm from "../ultils/validateForm";
import "react-toastify/dist/ReactToastify.css";
import { formatMoney } from "../ultils/format";

const FormContainer = styled.form`
  width: 100%;
  margin: auto;
  margin-top: 3rem;
`;

const FormInput = styled.input`
  margin-bottom: 1rem;
  display: block;
  height: 2rem;
  border-radius: 5px;
  width: 100%;
`;

const FormButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`;

const FormButton = styled.button`
  background-color: #122620;
  color: #f4ebd0;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(18, 38, 32, 0.9);
  }
`;

const Errorcontainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f51720;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
`;
const ErrorcontainerInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ErrorlistContainer = styled.div``;

const Label = styled.label`
  margin-bottom: 0.3rem;
  display: block;
`;
const Title = styled.h1`
  margin-top: 1rem;
  display: block;
`;

export default function Form() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    salario: "",
    desconto: "",
    dependentes: "",
  });
  const [errorList, setErrorList] = useState([]);
  const google = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { push } = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (errors.length > 0) {
      return setErrorList(errors);
    }
    if (id) {
      try {
        await axios.put(`https://seidor.herokuapp.com/api/${id}`, form);
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
        const employee = await axios.get(
          `https://seidor.herokuapp.com/api/employee/${id}`
        );
        setForm(employee.data);
      }
      const userGoogleId = await localStorage.getItem("userGoogleId");
      google.current = userGoogleId;
    }
    getParams();
  }, []);

  const ErrorComponent = () => {
    const errors = () =>
      errorList.map((error) => {
        return <h5>{error}</h5>;
      });

    return (
      <Errorcontainer>
        <ErrorcontainerInfo>
          <h3 style={{ marginBottom: "1rem" }}>
            Não foi possível enviar seu formulário pelos seguinte erros
          </h3>
          <AiFillCloseCircle
            style={{ cursor: "pointer" }}
            onClick={() => {
              setErrorList([]);
            }}
          />
        </ErrorcontainerInfo>
        <ErrorlistContainer>{errors()}</ErrorlistContainer>
      </Errorcontainer>
    );
  };

  return (
    <>
      {errorList.length > 0 && ErrorComponent()}
      <Title>Cadastro de funcionários</Title>
      <FormContainer onSubmit={submitForm}>
        <Label>Nome</Label>
        <FormInput
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <Label>CPF</Label>
        <FormInput
          maxLength="11"
          value={form.cpf}
          onChange={(e) => {
            const replcaced = e.target.value.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              "$1.$2.$3-$4"
            );
            setForm({ ...form, cpf: replcaced });
          }}
        />
        <Label>Salário</Label>
        <FormInput
          value={form.salario}
          onChange={(e) => {
            setForm({ ...form, salario: e.target.value });
          }}
          type="number"
        />
        <Label>Desconto</Label>
        <FormInput
          value={form.desconto}
          onChange={(e) => setForm({ ...form, desconto: e.target.value })}
          type="number"
        />
        <Label>Dependentes</Label>
        <FormInput
          value={form.dependentes}
          onChange={(e) => setForm({ ...form, dependentes: e.target.value })}
          type="number"
        />
        <FormButtonContainer>
          <FormButton type="submit">Enviar</FormButton>
        </FormButtonContainer>
      </FormContainer>
    </>
  );
}
