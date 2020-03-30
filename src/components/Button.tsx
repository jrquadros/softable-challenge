import styled from 'styled-components'

export const Button = styled.button`
  font-size: 18px;
  padding: 20px;
  border-radius: 5px;
  border: none;
  background-color: tomato;
  color: #fff;
  width: 100%;
  transition: 0.4s opacity;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
