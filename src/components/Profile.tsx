import React from 'react'
import styled from 'styled-components'
import { Description } from '../components/Description'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`

type PhotoProps = {
  imageUrl?: string
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

const Title = styled.h2`
  margin-top: 20px;
`

const Subtitle = styled.span`
  font-size: 16px;
`

type ProfileProps = {
  imageUrl?: string
  title?: string
  description?: string
  Segment?: { name: string }
}

export const Profile = ({ imageUrl, title, description, Segment }: ProfileProps) => {
  return (
    <Container>
      <Photo imageUrl={imageUrl} />
      <Title>{title}</Title>
      <Subtitle>{Segment?.name}</Subtitle>
      <Description>
        <p>{description}</p>
      </Description>
    </Container>
  )
}
