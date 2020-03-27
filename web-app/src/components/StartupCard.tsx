import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 5px;

  display: flex;
  align-items: center;

  border-radius: 10px;

  width: 100%;
  margin-bottom: 20px;

  :hover {
    cursor: pointer;
  }
`

const InfoContainer = styled.div`
  background-color: #fff;
  text-decoration: none;
  text-align: left;

  flex: 3;
  border-radius: 0 10px 10px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20px;
  height: 120px;
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
  width: 150px;
  max-width: 150px;
  height: 150px;
  border-radius: 10px;
  background-color: #fff;
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
