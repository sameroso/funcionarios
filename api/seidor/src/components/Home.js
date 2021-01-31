import { useEffect, useState } from "react";
import styled from "styled-components";
import EmployeeCard from "./EmployeeCard";
import SearchBar from "./Searchbar";
import { getEmployeeList } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { BsPlusCircleFill } from "react-icons/bs";

import Modal from "./Modal";
import { Link } from "react-router-dom";

const EmployeeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const AddIconWrapper = styled.div`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
`;

export default function Home() {
  const employees = useSelector((state) => state.employees);
  const [filteredEmployees, setFilteredEmployees] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    async function getPeople() {
      setFilteredEmployees(null);
      const userGoogleId = await localStorage.getItem("userGoogleId");
      dispatch(getEmployeeList(userGoogleId));
    }
    getPeople();
  }, []);

  const renderedList = () => filteredEmployees || employees;

  return (
    <>
      <SearchBar setFilteredEmployees={setFilteredEmployees} />
      <EmployeeContainer>
        {renderedList() &&
          renderedList().map((person) => (
            <EmployeeCard key={person._id} employeeData={person} />
          ))}
        <Modal
          filteredEmployees={filteredEmployees}
          setFilteredEmployees={setFilteredEmployees}
        />
      </EmployeeContainer>
      <Link to="/form">
        <AddIconWrapper>
          <BsPlusCircleFill fontSize="50px" color="#122620" />
        </AddIconWrapper>
      </Link>
    </>
  );
}
