import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions";

const NavContainer = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: red;
`;
NavContainer.list = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: red;
  padding: 20px;
`;

export default function Navbar() {
  const { push } = useHistory();
  const [userPic, setUserPic] = useState();
  const [userName, setUserName] = useState();
  const dispatch = useDispatch();

  async function logout() {
    await localStorage.removeItem("userGoogleId");
    await localStorage.removeItem("userName");
    await localStorage.removeItem("userPic");
    dispatch(userLogin(null));
    push("/login");
  }

  useEffect(() => {
    async function verifyUserLoggedIn() {
      const user = await localStorage.getItem("userGoogleId");
      if (!user) {
        push("/login");
      }
    }
    async function loadUserInfo() {
      const lsUserPic = await localStorage.getItem("userPic");
      const lsUserName = await localStorage.getItem("userName");
      setUserPic(lsUserPic);
      setUserName(lsUserName);
    }
    verifyUserLoggedIn();
    loadUserInfo();
  }, []);

  return (
    <NavContainer>
      <NavContainer.list>
        <div>
          <img src={userPic} />
          <li>{userName}</li>
        </div>
        <li onClick={logout}>Sair</li>
      </NavContainer.list>
    </NavContainer>
  );
}
