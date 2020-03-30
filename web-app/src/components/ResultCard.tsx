import React from 'react'
import styled from 'styled-components'
import Rating from '@material-ui/lab/Rating'
import { Separator } from './Separator'

type ResultCardProps = {
  name?: string
  imageUrl?: string
  segment?: string
  rating?: number
  position?: number
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 20px;
`

const Photo = styled.div<ResultCardProps>`
  width: 100px;
  height: 100px;
  height: 100px;
  border-radius: 5px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`
const StartupInfoContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`

const Title = styled.span`
  font-size: 18px;
`

const Subtitle = styled.span`
  font-size: 14px;
`

const RatingInfo = styled.div`
  margin-left: 5px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Position = styled.span`
  font-size: 20px;
  justify-self: flex-end;
`

export const ResultCard = ({ name, imageUrl, segment, rating, position }: ResultCardProps) => {
  return (
    <Wrapper>
      <Photo imageUrl={imageUrl} />
      <StartupInfoContainer>
        <Title>{name}</Title>
        <Separator size={5} />
        <Subtitle>{segment}</Subtitle>
        <Separator size={10} />
        <Separator size={10} />
        <Row>
          <Rating size={'medium'} readOnly={true} value={rating} precision={1} name={name} />
          <RatingInfo>{rating}/5</RatingInfo>
        </Row>
      </StartupInfoContainer>
      <Position>{position}º</Position>
    </Wrapper>
  )
}
