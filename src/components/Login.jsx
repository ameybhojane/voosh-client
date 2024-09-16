import { TextField } from "@mui/material";
import React,{useEffect, useState} from "react";
import { Link ,useNavigate } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardText,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import config from './../config/config';
import { login } from '../redux/loginSlice';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import loginSlice from "../redux/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


function Login() {
  const { isAuthenticated, user } = useSelector((state) => state.login);

  const [formValues, setFormValues] = useState({
    password:"",
    email:""
  })
  const dispatch = useDispatch()
  const BASE_URL = config.BASE_URL;
  const navigate = useNavigate();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const user = await axios.post(`${BASE_URL}/users/logingoogle`,tokenResponse).then((res)=>{
        // console.log(res.data)
        dispatch(login(res.data))
      }).catch(e=>{
        console.log(e.message)
        toast(e?.response?.data?.message)
      })
    },
  });
  const handleOnChange = (e)=>{
    setFormValues({
      ...formValues,
      [e.target.name] : e.target.value
    })
  }

  useEffect(()=>{
    console.log("isAuth",isAuthenticated)
    if(isAuthenticated){
      navigate('/')
    }
  },[isAuthenticated])
  const loginUser =async ()=>{
    const resp = await axios.post(`${BASE_URL}/users/login`,formValues).then((res)=>{
      console.log(res.data)
      dispatch(login(res.data))
    }).catch(e=>{
      console.log(e.message)
      toast(e?.response?.data?.message)
    })
  }
  return (
    <Container>
      <ToastContainer/>
      <Row className="justify-content-center align-items-center h-100">
        <Col sm="4" xs="6">
          <Card
            body
            className="m-4 p-3 text-center"
            style={{
              width: "100%",
            }}
          >
            <CardTitle tag="h5" className="text-center">
              Login
            </CardTitle>

            <Form>
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                   value={formValues.email}
                   onChange={(e)=>handleOnChange(e)}

                />
                <Label for="email">Email</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                   value={formValues.password}
                   onChange={(e)=>handleOnChange(e)}

                />
                <Label for="password">Password</Label>
              </FormGroup>{" "}
              <Button color="primary" onClick={()=>loginUser()}>Login</Button>
            </Form>
            <CardText>
              Don't have an account? <Link to={"/signup"}>Signup</Link>
            </CardText>
            <Button color="primary" onClick={() => loginWithGoogle()}>
              Sign In with Google
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
