import GoogleLogin from "react-google-login";
import { userLogin } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

const LoginContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: solid 1px black;
  -webkit-box-shadow: 10px 5px 16px 0px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 10px 5px 16px 0px rgba(0, 0, 0, 0.34);
  box-shadow: 10px 5px 16px 0px rgba(0, 0, 0, 0.34);
  padding: 2rem;
  text-align: center;
`;

const LoginTitle = styled.h1`
  margin-bottom: 1rem;
`;

export default function Login() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector((state) => state.user);

  const responseGoogle = (response) => {
    dispatch(userLogin(response));
  };

  useEffect(() => {
    async function saveUserdata() {
      console.log(user);
      if (user?.googleId) {
        await localStorage.setItem("userGoogleId", user.googleId);
        await localStorage.setItem("userPic", user.Es.vI);
        await localStorage.setItem("userName", user.Es.sd);
        await axios.post(
          `https://seidor.herokuapp.com/api/auth/${user.googleId}`,
          {
            googleId: user.googleId,
          }
        );
        push("/");
      } else if (user) {
        toast.error("erro, tente mais tarde");
      }
    }
    saveUserdata();
  }, [responseGoogle]);

  return (
    <LoginContainer>
      <LoginTitle>Boas vindas ao cadastro de funionários! Faça seu login</LoginTitle>
      <GoogleLogin
        clientId="850494818820-o46m8193qci937c9r7hm5he3enq86lnm.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </LoginContainer>
  );
}
