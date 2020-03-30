import React from 'react'
import { StartupCard } from '../components/StartupCard'
import { Loading } from '../components/Loading'
import { Center } from '../components/Center'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`

const ALL_STARTUPS_QUERY = gql`
  query {
    allStartups {
      name
      imageUrl
      segment_id
      Segment {
        name
      }
    }
  }
`

type Startup = {
  name: string
  imageUrl: string
  segment_id: string
  Segment: Segment
}

type Segment = {
  name: string
}

type Data = {
  allStartups: Startup[]
}

const StyledLink = styled(Link)`
  text-decoration: none;
`

export const Home = () => {
  const { data, error, loading } = useQuery<Data>(ALL_STARTUPS_QUERY)

  if (error) {
    return <p>whoops! algo deu errado</p>
  }

  if (loading) {
    return (
      <Center>
        <Loading />
      </Center>
    )
  }

  return (
    <Wrapper>
      <Title>Escolha sua startup!</Title>
      {data?.allStartups.map((startup) => (
        <StyledLink to={`/startup/${startup.segment_id}`} key={startup.segment_id}>
          <StartupCard
            key={startup.segment_id}
            id={startup.segment_id}
            imageUrl={startup.imageUrl}
            name={startup.name}
            segment={startup.Segment?.name}
          />
        </StyledLink>
      ))}
    </Wrapper>
  )
}
