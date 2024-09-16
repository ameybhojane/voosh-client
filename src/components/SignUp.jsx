import axios from "axios";
import React ,{useEffect, useRef, useState}from "react";
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
import { useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


function SignUp() {
  const { isAuthenticated, user } = useSelector((state) => state.login);

  const BASE_URL = config.BASE_URL;
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  },[])

  const signupGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const resp = await axios.post(`${BASE_URL}/users/signupgoogle`,tokenResponse).then((res)=>{
        console.log(res.data)
        if(res.data?.alreadyPresent){
          toast("User already signed up ,Please Login")
        }else
        navigate('/login'); 
      }).catch(e=>console.log(e))
    },
  });

  const [formValues, setFormValues] = useState({
    firstName:"",
    lastName:"",
    password:"",
    confirmPassword:"",
    email:""
  })
  const formRef = useRef()

  const createUser = async ()=>{
    const resp = await axios.post(`${BASE_URL}/users/signup`,formValues).then((res)=>{
      console.log("user Created Successfully")
  
      navigate('/login'); 
    }).catch(e=>console.log(e))
  }

  const handleOnChange = (e)=>{
    setFormValues({
      ...formValues,
      [e.target.name] : e.target.value
    })
  }

  return (
    <Container>
<ToastContainer />
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
              Sign Up
            </CardTitle>

            <Form ref ={formRef}>
            <FormGroup floating>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  value={formValues.firstName}
                  onChange={(e)=>handleOnChange(e)}

                />
                <Label for="firstName">First Name</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  value={formValues.lastName}
                  onChange={(e)=>handleOnChange(e)}

                />
                <Label for="lastName">Last Name</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formValues.email}
                  onChange={(e)=>handleOnChange(e)}

                />
                <Label for="exampleEmail">Email</Label>
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
              {/* <FormGroup floating>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Password"
                  type="password"
                  value={formValues.confirmPassword}
                  onChange={(e)=>handleOnChange(e)}
                />
                <Label for="confirmPassword">Confirm Password</Label>
              </FormGroup>{" "} */}
              <Button color="primary" onClick={()=> createUser()}>Sign Up</Button>
            </Form>
            <CardText>
              Already have an account <Link to={"/login"}>Login</Link>
            </CardText>
            <Button color="primary" onClick={()=>signupGoogle()}>Sign Up with Google</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUp
