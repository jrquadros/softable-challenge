import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

type RouteParams = {
  id: string
}

export const StartupInfo = (props: RouteComponentProps<RouteParams>) => {
  return <h1>{props.match.params.id}</h1>
}
