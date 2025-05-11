import React, { useState } from 'react'
import { MoviesDashboard, Search } from '../components'

export default function ViewAll() {
  const [searchTerm, setSearchTerm] = useState("")
  
  return (
    <div className="min-vh-100 w-100 mb-5" style={{ backgroundColor: "#191919" }}>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MoviesDashboard searchTerm={searchTerm} category={"Movies"}></MoviesDashboard>
    </div>
  )
}
