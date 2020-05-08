import React from 'react'
import Main from '~/pages/Main'
import BaseLayout from './templates/BaseLayout'

import Header from '~/components/Header/Header'

function App() {
  return (
    <div className="App">
      <BaseLayout Header={<Header />}>
        <Main />
      </BaseLayout>
    </div>
  )
}

export default App
