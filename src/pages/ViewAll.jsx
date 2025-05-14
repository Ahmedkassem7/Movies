import { useState } from 'react'
import { MoviesDashboard } from '../components'
import SharedView from '../sharedComponent.jsx/SharedView'
import { useLocation } from 'react-router-dom';

export default function ViewAll() {
  const [searchTerm, setSearchTerm] = useState("")
    const location = useLocation();
  const category = location.pathname.includes('series') ? 'Series' : 'Movies'; //determine the category from url

  return (
    <SharedView searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <MoviesDashboard searchTerm={searchTerm} category={category}></MoviesDashboard>
    </SharedView>
  )
}
