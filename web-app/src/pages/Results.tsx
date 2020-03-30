import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../services/firebase'
import { useQuery } from 'react-apollo-hooks'
import lodash from 'lodash'
import gql from 'graphql-tag'
import { Separator } from '../components/Separator'
import { ResultCard } from '../components/ResultCard'

type StartupRatingData = {
  development: number
  presentation: number
  proposal: number
  user: string
  startupId: string
}

type Startup = {
  name: string
  imageUrl: string
  segment_id: string
  Segment: { name: string }
}

type StartupsData = {
  allStartups?: Startup[]
}

export const Results = () => {
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

  const [startupsRating, setStartupsRating] = useState<Array<StartupRatingData>>([])
  const [startups, setStartups] = useState<StartupsData>({ allStartups: [] })

  const { data, error, loading } = useQuery<StartupsData>(ALL_STARTUPS_QUERY)

  // get rating data
  useEffect(() => {
    const startupsRef = firebase.database().ref('rating')

    startupsRef.on('value', (snap) => {
      const newState = lodash.toArray(snap.val())

      setStartupsRating(newState)
    })
  }, [])

  useEffect(() => {
    setStartups({ allStartups: data?.allStartups })
  }, [data])

  // ranking logic
  const startupsRanked = () => {
    const startupsById = lodash.toArray(lodash.groupBy(startupsRating, 'startupId'))

    const startupsByDevelopment = lodash.sortBy(
      startupsById.map((startup) => {
        const startupInfo = startups.allStartups?.find(
          (item) => item.segment_id === lodash.head(startup)?.startupId
        )
        const averageRating = lodash.floor(
          lodash.divide(lodash.sumBy(startup, 'development'), startup.length),
          1
        )
        return { startup: startupInfo, development: averageRating }
      }),
      (item) => item.development
    )

    const startupsByPresentation = lodash.sortBy(
      startupsById.map((startup) => {
        const startupInfo = startups.allStartups?.find(
          (item) => item.segment_id === lodash.head(startup)?.startupId
        )
        const averageRating = lodash.floor(
          lodash.divide(lodash.sumBy(startup, 'presentation'), startup.length),
          1
        )
        return { startup: startupInfo, presentation: averageRating }
      }),
      (item) => item.presentation
    )

    const startupsByProposal = lodash.sortBy(
      startupsById.map((startup) => {
        const startupInfo = startups.allStartups?.find(
          (item) => item.segment_id === lodash.head(startup)?.startupId
        )
        const averageRating = lodash.floor(
          lodash.divide(lodash.sumBy(startup, 'proposal'), startup.length),
          1
        )

        return { startup: startupInfo, proposal: averageRating }
      }),
      (item) => item.proposal
    )

    return {
      development: lodash.reverse(startupsByDevelopment),
      presentation: lodash.reverse(startupsByPresentation),
      proposal: lodash.reverse(startupsByProposal),
    }
  }

  if (error) {
    return <p>whooops! algo deu errado</p>
  }

  if (loading) {
    return <p>loading...</p>
  }

  const { development, presentation, proposal } = startupsRanked()

  const Wrapper = styled.div`
    padding: 20px;
  `

  const Title = styled.h1`
    font-size: 28px;
  `

  const Subtitle = styled.h2`
    font-size: 24px;
    font-weight: normal;
  `

  return (
    <Wrapper>
      <Title>Resultados</Title>

      <Separator size={20} />
      <Subtitle>Proposta</Subtitle>
      <Separator size={20} />
      {proposal.map((ratingData, index) => (
        <ResultCard
          key={ratingData.startup?.segment_id}
          imageUrl={ratingData.startup?.imageUrl}
          segment={ratingData.startup?.Segment.name}
          name={ratingData.startup?.name}
          rating={ratingData.proposal}
          position={index + 1}
        />
      ))}

      <Separator size={20} />
      <Subtitle>Apesentação</Subtitle>
      <Separator size={20} />
      {presentation.map((ratingData, index) => (
        <ResultCard
          key={ratingData.startup?.segment_id}
          imageUrl={ratingData.startup?.imageUrl}
          segment={ratingData.startup?.Segment.name}
          name={ratingData.startup?.name}
          rating={ratingData.presentation}
          position={index + 1}
        />
      ))}

      <Separator size={20} />
      <Subtitle>Desenvolvimento</Subtitle>
      <Separator size={20} />
      {development.map((ratingData, index) => (
        <ResultCard
          key={ratingData.startup?.segment_id}
          imageUrl={ratingData.startup?.imageUrl}
          segment={ratingData.startup?.Segment.name}
          name={ratingData.startup?.name}
          rating={ratingData.development}
          position={index + 1}
        />
      ))}
    </Wrapper>
  )
}
