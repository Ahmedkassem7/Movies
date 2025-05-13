import { useState } from 'react'
import { MoviesDashboard } from '../components'
import SharedView from '../sharedComponent.jsx/SharedView'

export default function ViewAll() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SharedView searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <MoviesDashboard searchTerm={searchTerm} category={"Movies"}></MoviesDashboard>
    </SharedView>
  )
}
