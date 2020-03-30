import React, { useState, useEffect } from 'react'
import firebase from '../services/firebase'
import { useQuery } from 'react-apollo-hooks'
import lodash from 'lodash'
import gql from 'graphql-tag'

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

  useEffect(() => {
    const startupsRef = firebase.database().ref('rating')

    startupsRef.on('value', (snap) => {
      const newState = lodash.toArray(snap.val())

      setStartupsRating(newState)
    })
  }, [])

  //console.log(startups.filter((startup) => startup.startup == '2'))

  useEffect(() => {
    setStartups({ allStartups: data?.allStartups })
  }, [data])

  //ranking logic
  const startupsRanked = () => {
    const startupsById = lodash.toArray(lodash.groupBy(startupsRating, 'startupId'))

    const startupsByDevelopment = lodash.sortBy(
      startupsById.map((startup) => {
        const startupInfo = startups.allStartups?.find(
          (item) => item.segment_id === lodash.head(startup)?.startupId
        )
        return { startup: startupInfo, development: lodash.sumBy(startup, 'development') }
      }),
      (item) => item.development
    )

    return { development: lodash.reverse(startupsByDevelopment) }
  }

  if (error) {
    return <p>whooops! algo deu errado</p>
  }

  if (loading) {
    return <p>loading...</p>
  }

  console.log(startupsRanked())
  return <div></div>
}
