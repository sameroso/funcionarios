import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee, selectEmployee } from "../actions/index";
import styled from "styled-components";

const ModalContainer = styled.div`
  border: 1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-out;
  z-index: ${(props) => (props.id ? "2" : "-1")};
  opacity: ${(props) => (props.id ? "1" : "0")};
  background-color: white;
  overflow: hidden;
  border-radius: 5px;
`;
const ShadowArea = styled.div`
  border: 1px solid black;
  padding: 1rem;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-out;
  z-index: ${(props) => (props.id ? "1" : "-1")};
  opacity: ${(props) => (props.id ? "1" : "0")};
`;
const Head = styled.div`
  background-color: blue;
  padding: 1rem;
  color: white;
`;

const Body = styled.div`
  padding: 1rem;
`;

const BtnContainer = styled.div`
  margin-top: 1rem;
  text-align: right;
`;
const ConfirmButton = styled.button`
  border-radius: 5px;
  background-color: orange;
`;

const CancelButton = styled.button`
  margin-right: 1rem;   
`;

export default function Modal({ filteredEmployees, setFilteredEmployees }) {
  const employee = useSelector((state) => state.selectedEmployee);
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(selectEmployee(null));
  }
  async function removeEmployee() {
    try {
      await dispatch(deleteEmployee(employee?._id));
      const newList = filteredEmployees.filter((employees) => {
        return employees._id !== employee._id;
      });
      setFilteredEmployees(newList);
      closeModal();
    } catch {
      closeModal();
    }
  }
  return (
    <>
      <ShadowArea id={employee} onClick={closeModal}></ShadowArea>
      <ModalContainer id={employee}>
        <Head>Ecluir</Head>
        <Body>
          <span> Deseja excluir {employee?.nome}</span>
          <BtnContainer>
            <CancelButton onClick={closeModal}>não</CancelButton>
            <ConfirmButton onClick={removeEmployee}>sim</ConfirmButton>
          </BtnContainer>
        </Body>
      </ModalContainer>
    </>
  );
}
