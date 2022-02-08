import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accounts } from 'meteor/accounts-base'
import {useHistory} from 'react-router-dom';
import {Form, Button, Container} from 'react-bootstrap';

export default RegisterForm = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  //regex for : non-white-space char(s) -> @ non-white-space char(s) -> .com
  const emailFormat = /\S+@\S+\.com+/;
  //regex for : must include: digit, lower case, and upper case letter
  const passwordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/; 

  //goes to homepage
  function gotoHome(){
    console.log("worked");
    history.push("/");
  }

  //check if password is valid
  const passwordCheck = () => {
    var alertMessage = "";
  
    if(!(password.length>7)){
      alertMessage += "password does not have enough characters (need 8)!\n";
    }
  
    if(!(passwordFormat.test(password))){
        alertMessage += "Incorrect password format! Password must have a number, lower case and upper case character.\n";
    }
  
    if(alertMessage.length>1){
      alert(alertMessage);
      return false;
    }
    return true;
  }

  const submit = e => {
    e.preventDefault();

    //check for email format
    if(!(emailFormat.test(email))){
  		alert("Incorrect email format!");
      return;
	  } 
  
    if(password != confirmPassword){ //check if confirm password field is correct
      alert("Passwords must match")
      return;
    }

    //check password format
    if(!passwordCheck()){
      return;
    }

    Accounts.createUser({
      email: email,
      password: password,
      },
        function(error){
      if(error){
        alert(error.reason);
      }
    })

    Meteor.loginWithPassword(email, password, function(error){ //log user in if they successfully registered
      if(error){
        alert(error.reason);
      }
    })
      
    gotoHome()
  };

  return (
    <Container style={{width:700}}> 
      
        <br/>
        <h1 align="center">Register</h1>
        <Form onSubmit={submit} className="login-form" style={{padding: "1rem"}}>
        <label>Email</label>
        <br/>
        <div className="input-group mb-3">
            <input
            type="text"
            className="form-control"
            name="email"
            required
            onChange={(e) => setemail(e.target.value)}
            />
        </div>

        <label>Password</label>
          <br/>
        <div className="input-group mb-3">
            <input
            type="password"
            className="form-control"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
            <label><u>Password must have a number, lower case and upper case character</u></label>
        </div>
        <label>Confirm Password</label>
        <br/>
        <div className="input-group">
            <input
            type="password"
            className="form-control"
            name="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>

        <div style={{paddingTop: "1rem"}}>
            <Button type="submit">Register</Button>
        </div>

    </Form>
    </Container>
  );
};