import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectEmployee } from "../actions/index";

const EmployeeCardContainer = styled.div`
  margin: 10px;
  padding: 1rem;
  border: solid 1px black;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;
const InfoContainer = styled.div`
  margin-bottom: 1rem;
`;

export default function EmployeeCard({ employeeData, setFilteredEmployees }) {
  const { _id, nome, cpf, dependentes, desconto, salario } = employeeData;
  const dispatch = useDispatch();

  function select() {
    dispatch(selectEmployee({ _id, nome }));
  }

  return (
    <EmployeeCardContainer>
      <div onClick={select}>x</div>
      <Link to={`/form/${_id}`}>
        <InfoContainer>
          <Label>Nome</Label>
          <strong>{nome}</strong>
        </InfoContainer>
        <InfoContainer>
          <Label>Cpf</Label>
          <strong>{cpf}</strong>
        </InfoContainer>
        <InfoContainer>
          <Label>Dependentes</Label>
          <strong>{dependentes}</strong>
        </InfoContainer>
        <InfoContainer>
          <Label>Desconto</Label>
          <strong>{desconto}</strong>
        </InfoContainer>
        <InfoContainer>
          <Label>Salário</Label>
          <strong>{salario}</strong>
        </InfoContainer>
      </Link>
    </EmployeeCardContainer>
  );
}

