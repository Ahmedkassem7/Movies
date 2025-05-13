import { useState } from 'react'
import { Actors } from '../components'
import SharedView from '../sharedComponent.jsx/SharedView'

export default function ActorsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <div>
            <SharedView searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
                <Actors searchTerm={searchTerm}></Actors>
            </SharedView>
        </div>
    )
}
