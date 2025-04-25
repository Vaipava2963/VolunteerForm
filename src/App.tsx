import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import VolunteerForm from './components/form1'
import VolunteerList from './components/list'

function App() {

  return (
    <div className="App">
      <VolunteerForm />
      <VolunteerList />
    </div>
  )
}

export default App
  


