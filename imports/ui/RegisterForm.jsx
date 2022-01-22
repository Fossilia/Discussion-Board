import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button, Container} from 'react-bootstrap';

export default RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <Container> 
        <br/>
        <h1 align="center">Register</h1>
        <Form onSubmit={submit} className="login-form" style={{padding: "1rem"}}>
        <div className="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>

            <input
            type="text"
            class="form-control"
            placeholder="Email"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>

        <div className="input-group">
        <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Password</span>
            </div>

            <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="input-group">
        <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Confirm Password</span>
            </div>

            <input
            type="password"
            class="form-control"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div style={{padding: "1rem"}}>
            <Button type="submit" onClick={RegisterForm}>Register</Button>
        </div>

    </Form>
    </Container>
  );
};