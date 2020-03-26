import React from 'react'
import { StartupCard } from './components/StartupCard'
import { GlobalStyle } from './components/GlobalStyle'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 20px;

  width: 100vw;
  height: 100vh;

  background-color: #f0f0ee;
`

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Container>
        <StartupCard
          id={'asdf'}
          imageUrl={'https://www.eaalim.com/download/wp-content/uploads/2014/01/hellfire.jpg'}
          segment={'NomeDaStartUp'}
          name={'Biotech'}
        />
      </Container>
    </div>
  )
}

export default App
