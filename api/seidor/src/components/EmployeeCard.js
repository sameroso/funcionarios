import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { selectEmployee } from "../actions/index";
import discountCalc from "../ultils/discountCalc";
import { formatToCurrency } from "../ultils/format";

const EmployeeCardContainer = styled.div`
  margin: 10px;
  padding: 1rem;
  border: solid 1px black;
  border-radius: 5px;
  background-color: rgba(244, 235, 208, 0.2);
  -webkit-box-shadow: 10px 5px 16px 0px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 10px 5px 16px 0px rgba(0, 0, 0, 0.34);
  box-shadow: 10px 5px 16px 0px rgba(0, 0, 0, 0.34);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;
const InfoContainer = styled.div`
  margin-bottom: 1rem;
`;

const ActionContainer = styled.div`
  background-color: #122620;
  margin: -1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const Name = styled.h4`
  color: #f4ebd0;
`;
const DeleteAction = styled.div`
  cursor: pointer;
`;

export default function EmployeeCard({ employeeData }) {
  const { _id, nome, cpf, dependentes, desconto, salario } = employeeData;
  const dispatch = useDispatch();

  function select() {
    dispatch(selectEmployee({ _id, nome }));
  }

  return (
    <EmployeeCardContainer>
      <ActionContainer>
        <Name>{nome}</Name>
        <DeleteAction>
          <AiFillDelete onClick={select} color="#B68D40" />
        </DeleteAction>
      </ActionContainer>
      <Link to={`/form/${_id}`}>
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
          <strong>{formatToCurrency(salario.toFixed(2))}</strong>
        </InfoContainer>
        <InfoContainer>
          <Label>Salário base IR</Label>
          <strong>
            {formatToCurrency(
              discountCalc(employeeData).salarioBaseIr.toFixed(2)
            )}
          </strong>
        </InfoContainer>
        <InfoContainer>
          <Label>Desconto IRRF</Label>
          <strong>
            {formatToCurrency(
              discountCalc(employeeData).descontoIrrf.toFixed(2)
            )}
          </strong>
        </InfoContainer>
      </Link>
    </EmployeeCardContainer>
  );
}
