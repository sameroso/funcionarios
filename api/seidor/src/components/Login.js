import GoogleLogin from "react-google-login";
import { userLogin } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const user = useSelector((state) => state.user);

  const responseGoogle = (response) => {
    dispatch(userLogin(response));
  };

  useEffect(() => {
    async function saveUserdata() {
      if (user?.googleId) {
        console.log(user)
        await localStorage.setItem("userGoogleId", user.googleId);
        await localStorage.setItem("userPic", user.Es.vI);
        await localStorage.setItem("userName", user.Es.sd);
        await axios.post(`/api/auth/${user.googleId}`, {
          googleId: user.googleId,
        });
        push("/");
      } else if (user) {
        toast.error("erro, tente mais tarde");
      }
    }
    saveUserdata();
  }, [responseGoogle]);

  return (
    <GoogleLogin
      clientId="850494818820-o46m8193qci937c9r7hm5he3enq86lnm.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}
