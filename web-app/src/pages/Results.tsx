import React, { useState, useEffect } from 'react'
import firebase from '../services/firebase'

export const Results = () => {
  const [startups, setStartups] = useState([])

  useEffect(() => {
    const startupsRef = firebase.database().ref('startups')

    startupsRef.on('value', (snapshot) => {
      const newState = snapshot.val()
      setStartups(newState)
    })
  }, [])

  console.log(startups)

  return <p>Results</p>
}
