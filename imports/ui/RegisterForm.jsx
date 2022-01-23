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

  function gotoHome(){
    console.log("worked");
    history.push("/");
  }

  const submit = e => {
    e.preventDefault();
    
    if(password == confirmPassword){
      Accounts.createUser({
        email: email,
        password: password,
        },
         function(error){
        if(error){
          alert(error.reason);
        }
      })

      Meteor.loginWithPassword(email, password, function(error){
        if(error){
          alert(error.reason);
        }
      })
      
      gotoHome()
      //ReactDOM.render(<Redirect to="/"/>, document.getElementById('root'));
    }
    else{
      alert("Passwords must match")
    }
    ;
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