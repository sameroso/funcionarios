import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
  position: sticky;
  width: 100%;
  top: 0;
`;
NavContainer.list = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #122620;
  padding: 0.5rem 2rem;
  color: #f4ebd0;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-right: 1rem;
`;

const LogoutIcon = styled.div`
  cursor: pointer;
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
        <Link to="/">
          <UserWrapper>
            <Img src={userPic} />
            <h4>{userName}</h4>
          </UserWrapper>
        </Link>
        <LogoutIcon onClick={logout}>
          <FiLogOut />
        </LogoutIcon>
      </NavContainer.list>
    </NavContainer>
  );
}
