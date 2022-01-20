import React from 'react'
import { MDBInput } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export const TextBox = () => {
    return (
        <MDBInput type="textarea" label="Material textarea" rows="5" />
    )
}