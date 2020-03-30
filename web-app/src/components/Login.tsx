import React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Title = styled.span`
  font-size: 22px;

  margin-bottom: 20px;
`

type LoginProps = {
  authFunction?: () => void
}

export const Login = ({ authFunction }: LoginProps) => {
  return (
    <Wrapper>
      <Title>Faça login para avaliar</Title>
      <Button onClick={authFunction}>Login</Button>
    </Wrapper>
  )
}
