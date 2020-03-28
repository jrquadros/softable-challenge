import React from 'react'
import styled from 'styled-components'
import firebase from '../services/firebase'

const Button = styled.button`
  font-size: 18px;
  padding: 5px;
  border-radius: 5px;
`

const provider = new firebase.auth.GoogleAuthProvider()

const auth = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.log(error))
}

export const Login = () => {
  return <Button onClick={auth}>Login</Button>
}
