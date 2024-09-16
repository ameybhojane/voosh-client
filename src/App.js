import "./App.css";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";


import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Button } from "reactstrap";
import { logout } from "./redux/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";

function App() {

  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={
          "821368368840-slg0bvl072f7t59mt6n3dl1rlg3esd92.apps.googleusercontent.com"
        }
      >
        <div className="App">
          {/* <DrawerAppBar/> */}
          <NavBar />
          <Routes />
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
