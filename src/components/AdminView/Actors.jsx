import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActorsTable, Loading } from '../../components';
import { getAllActorsAction } from '../../store/peopleSlice';

export default function Actors({ searchTerm }) {
    const { people, loading, error } = useSelector((store) => store.peopleSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllActorsAction())
    }, [dispatch])

    const filteredPeople = searchTerm
        ? people.filter((actor) =>
            actor.original_name?.toLowerCase().includes(searchTerm?.toLowerCase())
        )
        : people;
    return (
        <div>
            <div className="row m-auto p-0 mt-3 container-md">
                {loading && <Loading />}
                {error && <div className="text-center">{error}</div>}
                {!loading && !error && filteredPeople.length > 0 ? (
                    <>
                        <div
                            className="my-sm-0 mt-md-4  mx-3 mb-0"
                            style={{ width: 'fit-content' }}
                        >
                            <p className="font text-light sec-color fs-1 fw-bold">
                                Actors
                            </p>
                        </div>

                        <table
                            className="view-table"
                            style={{ borderCollapse: 'separate', borderSpacing: '0 20px' }}
                        >
                            <thead>
                                <tr
                                    className="text-center"
                                    style={{ backgroundColor: '#212121' }}
                                >
                                    <th className="font sec-color fs-5 mb-0 px-2 px-sm-4 pt-4 pb-3 rounded-start-3">
                                        Name
                                    </th>
                                    <th className="font sec-color fs-5 mb-0 px-4 pt-4 pb-3 d-none d-xl-table-cell">
                                        popularity
                                    </th>
                                    <th className="font sec-color fs-5 mb-0 px-2 px-sm-4 pt-4 pb-3 ">
                                        Famous Movie
                                    </th>
                                    <th className="font sec-color fs-5 mb-0 px-4 pt-4 pb-3 rounded-end-3 d-none d-sm-table-cell">
                                        Top Movie Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPeople.map((actor) => (
                                    <ActorsTable key={actor.id} actor={actor} />
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    !loading &&
                    !error &&
                    filteredPeople.length === 0 && (
                        <div
                            className="text-center text-white d-flex align-items-center justify-content-center"
                            style={{ height: '80vh' }}
                        >
                            <p
                                className="alert w-75 fs-3 text-dark fw-medium"
                                style={{ backgroundColor: '#3DD2CC' }}
                            >
                                No movies found
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
