import React from 'react'
import {Button} from '@material-ui/core'
import styled from 'styled-components'

import Pingu from '../assets/penguin.svg'
import {auth, provider} from '../firbase/firebase'

const Login = () => {

  const signInHandler = () => {
    auth.signInWithPopup(provider).catch(err => alert(err.message))
  }

  return (
    <LoginContainer>
      <LogoContainer>
        <LoginImage src={Pingu} alt="logo" />
      </LogoContainer>
      <LoginTitle>iMeseji</LoginTitle>
      <LoginButton onClick={signInHandler} >Sign In</LoginButton>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100%;
`;
​
const LogoContainer = styled.div``;
const LoginImage = styled.img`
    object-fit: contain;
    height: 350px;
`;
​
const LoginTitle = styled.h1`
    text-align: center;
`;
​
const LoginButton = styled(Button)`
    width: 300px;
    background-color: #3ea4fb;
    color: #eff2f5;
    font-weight: 800;
    cursor: pointer;
​
    &:hover {
        background-color: gainsboro;
        color: #3ea4fb;
    }
`;
