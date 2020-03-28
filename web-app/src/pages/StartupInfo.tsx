import React, { useState } from 'react'
import styled from 'styled-components'
import { Profile } from '../components/Profile'
import { Rating } from '../components/Rating'
import { Login } from '../components/Login'
import { Separator } from '../components/Separator'
import { useQuery } from 'react-apollo-hooks'
import { RouteComponentProps } from 'react-router-dom'
import firebase from '../services/firebase'
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

  // const writeStartupRating = () => {}

  const userAuth = () => {
    const providers = {
      google: new firebase.auth.GoogleAuthProvider(),
      facebook: new firebase.auth.FacebookAuthProvider(),
      twitter: new firebase.auth.TwitterAuthProvider(),
    }

    firebase.auth().currentUser === null
      ? firebase
          .auth()
          .signInWithPopup(providers.google)
          .then((result) => {
            const user = result.user
            setCurrentUser(user)
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const credential = error.credential

            throw new Error(`code: ${errorCode} message: ${errorMessage} credential: ${credential}`)
          })
      : setCurrentUser(firebase.auth().currentUser)
  }

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
      {currentUser ? (
        <>
          <Rating
            name={'rating-proposal'}
            title={'Proposta'}
            value={rating.proposal}
            onChange={(event, newValue) => {
              setRating({ proposal: newValue })
            }}
          />
          <Separator size={20} />
          <Rating
            name={'rating-presentation'}
            title={'Apresentação/Pitch'}
            value={rating.presentation}
            onChange={(event, newValue) => {
              setRating({ presentation: newValue })
            }}
          />
          <Separator size={20} />
          <Rating
            name={'rating-development'}
            title={'Desenvolvimento'}
            value={rating.development}
            onChange={(event, newValue) => {
              setRating({ development: newValue })
            }}
          />
        </>
      ) : (
        <Login authFunction={userAuth} />
      )}
    </Wrapper>
  )
}
