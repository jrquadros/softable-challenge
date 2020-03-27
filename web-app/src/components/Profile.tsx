import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
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

const Title = styled.h2``

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
      <p>{description}</p>
      <p>{Segment?.name}</p>
    </Container>
  )
}
