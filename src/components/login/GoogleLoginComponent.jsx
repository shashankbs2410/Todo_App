import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import classes from "./GoogleLoginComponent.module.css";
import { uiActions } from "../../store/ui-slice";
import googeLogo from "../../assets/googleIcon.jpg";
import { jwtDecode } from "jwt-decode";

const Google = (props) => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.ui.signedIn);

  const logoutHandler = () => {
    googleLogout();
    dispatch(uiActions.toggeSignIn());
  };

  return (
    <div>
      {!isSignedIn && (
        <div className={classes.login_button}>
          <div className={classes.sign_in}>
            <h2>Sign in to Continue...</h2>
            <GoogleLogin
              onSuccess={(response) => {
                const decoded = jwtDecode(response.credential);
                console.log({
                    name: decoded.name,
                    email: decoded.email,
                  })
                dispatch(
                  uiActions.setUserinfo({
                    name: decoded.name,
                    email: decoded.email,
                  })
                );
                dispatch(uiActions.toggeSignIn());
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
        </div>
      )}
      {isSignedIn && (
        <button className={classes.logout_button} onClick={logoutHandler}>
          <img
            className={classes.google_logo}
            src={googeLogo}
            alt="Google logo"
          />
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Google;
