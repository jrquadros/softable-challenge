import React from 'react'
import { Profile } from '../components/Profile'
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

export const StartupInfo = (props: RouteComponentProps<RouteParams>) => {
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
    <Profile
      imageUrl={startup?.imageUrl}
      title={startup?.name}
      Segment={startup?.Segment}
      description={startup?.description}
    />
  )
}
