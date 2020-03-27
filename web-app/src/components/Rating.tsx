import React from 'react'
import styled from 'styled-components'
import MaterialRating from '@material-ui/lab/Rating'

type RatingProps = {
  title?: string
}

const Title = styled.span`
  font-size: 22px;
  margin-bottom: 10px;
`

export const Rating = ({ title }: RatingProps) => {
  return (
    <>
      <Title>{title}</Title>
      <MaterialRating size={'large'} />
    </>
  )
}
