import React from 'react';
import { GoogleOutlined} from '@ant-design/icons';
import "firebase/app";

import { auth } from '../firebase';
import firebase from 'firebase/app';

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to the NFT Marketplace chat</h2>

                <div
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined /> Sign in using Google
                </div>

                <br /> <br />
                
            </div>
        </div>
    );
}

export default Login;