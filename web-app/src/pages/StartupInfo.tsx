import React, { useState } from 'react'
import styled from 'styled-components'
import { Profile } from '../components/Profile'
import { Rating } from '../components/Rating'
import { Login } from '../components/Login'
import { Separator } from '../components/Separator'
import { Center } from '../components/Center'
import { Loading } from '../components/Loading'
import { useQuery } from 'react-apollo-hooks'
import { RouteComponentProps } from 'react-router-dom'
import firebase from '../services/firebase'
import gql from 'graphql-tag'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'

type RouteParams = {
  id: string
}

type Startup = {
  name: string
  imageUrl: string
  description: string
  segment_id: string
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
      segment_id
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
  padding: 20px;
`

export const StartupInfo = (props: RouteComponentProps<RouteParams>) => {
  type StartupRating = {
    proposal?: number | undefined | null
    presentation?: number | undefined | null
    development?: number | undefined | null
  }

  const [rating, setRating] = useState<StartupRating>({})
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  type WriteStartupRatingProps = {
    startupId?: string
    userId: string
  }

  const writeStartupRating = ({ startupId, userId }: WriteStartupRatingProps) => {
    firebase.database().ref(`rating`).push({
      startupId,
      userId,
      proposal: rating.proposal,
      presentation: rating.presentation,
      development: rating.development,
    })
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
    }
  })

  const userAuth = () => {
    const providers = {
      google: new firebase.auth.GoogleAuthProvider(),
      facebook: new firebase.auth.FacebookAuthProvider(),
      twitter: new firebase.auth.TwitterAuthProvider(),
    }

    firebase.auth().signInWithRedirect(providers.google)
  }

  const { data, error, loading } = useQuery<Data>(STARTUP_INFO_QUERY, {
    variables: { segmentId: props.match.params.id },
  })

  const history = useHistory()

  const startup = data?.allStartups[0]

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
      <Profile
        imageUrl={startup?.imageUrl}
        title={startup?.name}
        Segment={startup?.Segment}
        description={startup?.description}
      />
      <Separator size={20} />
      {currentUser ? (
        <>
          <Rating
            name={'rating-proposal'}
            title={'Proposta'}
            value={rating.proposal}
            onChange={(event, newValue) => {
              setRating({
                proposal: newValue,
                development: rating.development,
                presentation: rating.presentation,
              })
              console.log(rating)
            }}
          />
          <Separator size={20} />
          <Rating
            name={'rating-presentation'}
            title={'Apresentação/Pitch'}
            value={rating.presentation}
            onChange={(event, newValue) => {
              setRating({
                presentation: newValue,
                development: rating.development,
                proposal: rating.proposal,
              })
            }}
          />
          <Separator size={20} />
          <Rating
            name={'rating-development'}
            title={'Desenvolvimento'}
            value={rating.development}
            onChange={(event, newValue) => {
              setRating({
                development: newValue,
                presentation: rating.presentation,
                proposal: rating.proposal,
              })
            }}
          />
          <Separator size={20} />
          <Button
            onClick={() => {
              writeStartupRating({ userId: currentUser.uid, startupId: startup?.segment_id })
              history.replace('/results')
            }}
          >
            Avaliar
          </Button>
        </>
      ) : (
        <Login authFunction={userAuth} />
      )}
    </Wrapper>
  )
}
