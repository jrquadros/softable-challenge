import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 10px;
  background-color: #fefefe;
  -webkit-box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.45);
  box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  flex-direction: column;

  border-radius: 10px;

  width: 100%;
  margin-bottom: 20px;

  :hover {
    cursor: pointer;
  }
`

const InfoContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`

type StartupCardProps = {
  name: string
  segment: string
  imageUrl: string
  id: string
}

type PhotoProps = {
  imageUrl: string
}

const Photo = styled.div<PhotoProps>`
  width: 200px;
  max-width: 200px;
  height: 200px;
  border-radius: 5px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const Title = styled.span`
  text-decoration: none;
  font-size: 22px;
  color: #424242;
`

const Subtitle = styled.span`
  text-decoration: none;
  font-size: 18px;
  color: #7a7a7a;
  margin-top: 5px;
`

export const StartupCard = ({ name, segment, imageUrl }: StartupCardProps) => {
  return (
    <Wrapper>
      <Photo imageUrl={imageUrl} />
      <InfoContainer>
        <Title>{name}</Title>
        <Subtitle>{segment}</Subtitle>
      </InfoContainer>
    </Wrapper>
  )
}
