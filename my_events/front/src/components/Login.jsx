import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

   if(isAuthenticated) {
    navigate("/account/profil");
    return null;
   }


  return (
    <>
    <Header />
      {!isAuthenticated && (
          <button onClick={() => loginWithRedirect()}>
              Sign In
          </button>
      )}
     </>
  )

}

export default Login