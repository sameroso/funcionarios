import React, { useState } from "react";
import styled from "styled-components";
import { compareInputToValue } from "../ultils/text";
import { useSelector } from "react-redux";

const Input = styled.input`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  width: 100%;
  border-radius: 5px;
  height: 1.5rem;
`;

export default function SearchBar({ setFilteredEmployees }) {
  const employeeList = useSelector((state) => state.employees);

  const searchEmployee = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      return setFilteredEmployees(employeeList);
    }
    const filteredArr = employeeList.filter((filteredPeople) => {
      return (
        compareInputToValue(inputValue, filteredPeople.nome) ||
        compareInputToValue(inputValue, filteredPeople.cpf) ||
        compareInputToValue(inputValue, filteredPeople.dependentes) ||
        compareInputToValue(inputValue, filteredPeople.desconto) ||
        compareInputToValue(inputValue, filteredPeople.salario)
      );
    });
    setFilteredEmployees(filteredArr);
  };
  return <Input onChange={searchEmployee} />;
}
