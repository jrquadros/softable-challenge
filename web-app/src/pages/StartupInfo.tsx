import React, { useState } from 'react'
import styled from 'styled-components'
import { Profile } from '../components/Profile'
import { Rating } from '../components/Rating'
import { Separator } from '../components/Separator'
import { useQuery } from 'react-apollo-hooks'
import { RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'

type RouteParams = {
  id: string
}

type Startup = {
  name: string
  imageUrl: string
  description: string
  Segment: Segment
}

type Segment = {
  name: string
}

type Data = {
  allStartups: Startup[]
}

const STARTUP_INFO_QUERY = gql`
  query AllStarTups($segmentId: ID!) {
    allStartups(filter: { segment_id: $segmentId }) {
      name
      imageUrl
      description
      Segment {
        name
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StartupInfo = (props: RouteComponentProps<RouteParams>) => {
  const [proposal, setProposal] = useState<number | null | undefined>(0)
  const [presentation, setPresentation] = useState<number | null | undefined>(0)
  const [development, setDevelopment] = useState<number | null | undefined>(0)

  const { data, error, loading } = useQuery<Data>(STARTUP_INFO_QUERY, {
    variables: { segmentId: props.match.params.id },
  })

  const startup = data?.allStartups[0]

  if (error) {
    return <p>whoops! algo deu errado</p>
  }

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <Wrapper>
      <Profile
        imageUrl={startup?.imageUrl}
        title={startup?.name}
        Segment={startup?.Segment}
        description={startup?.description}
      />
      <Separator size={20} />
      <Rating
        name={'rating-proposal'}
        title={'Proposta'}
        value={proposal}
        onChange={(event, newValue) => {
          setProposal(newValue)
        }}
      />
      <Separator size={20} />
      <Rating
        name={'rating-presentation'}
        title={'Apresentação/Pitch'}
        value={presentation}
        onChange={(event, newValue) => {
          setPresentation(newValue)
        }}
      />
      <Separator size={20} />
      <Rating
        name={'rating-development'}
        title={'Desenvolvimento'}
        value={development}
        onChange={(event, newValue) => {
          setDevelopment(newValue)
        }}
      />
    </Wrapper>
  )
}
