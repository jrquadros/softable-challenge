import React from 'react'
import { Routes } from './routes'
import { GlobalStyle } from './components/GlobalStyle'

export function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes />
    </div>
  )
}
