import React from 'react'
import styled from 'styled-components'
import MaterialRating from '@material-ui/lab/Rating'

type RatingProps = {
  title?: string
  name: string
  value?: number | undefined | null
  onChange?: (event: React.ChangeEvent<{}>, value: number | null) => void | undefined
}

const Title = styled.span`
  font-size: 22px;
  margin-bottom: 10px;
`

export const Rating = ({ title, value, onChange, name }: RatingProps) => {
  return (
    <>
      <Title>{title}</Title>
      <MaterialRating size={'large'} name={name} value={value} onChange={onChange} />
    </>
  )
}
