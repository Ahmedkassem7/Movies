import { Search } from '../components'

export default function SharedView({ children, searchTerm, setSearchTerm }) {

  return (
    <div className="min-vh-100 w-100 mb-5" style={{ backgroundColor: "#191919" }}>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {children}
    </div>
  )
}
