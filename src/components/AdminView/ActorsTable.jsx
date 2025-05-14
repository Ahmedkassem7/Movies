export default function ActorsTable({ actor }) {
    return (
        <>
            <tr
                className="mb-5 mx-0 mx-md-3 px-4 text-center"
                style={{ backgroundColor: '#212121' }}
            >
                <td className=" font sec-color fs-5 px-2 px-sm-5 py-3 rounded-start-3">
                    {actor.original_name}
                </td>
                <td className=" font sec-color fs-5 px-5 py-3 d-none d-xl-table-cell">
                    {actor.popularity}
                </td>
                <td className="font sec-color fs-5 px-2 px-sm-5 py-3 rounded-end-3 custom-rounded-responsive">
                    {Array.isArray(actor.known_for) && actor.known_for.length > 0
                        ? actor.known_for[0].title
                        : 'N/A'}
                </td>
                <td className=" font sec-color fs-5 px-5 py-3 d-none d-sm-table-cell rounded-end-3">
                    ⭐{Math.max(...actor.known_for.map(m => m.vote_average || 0))}
                </td>

            </tr>
        </>
    )
}
