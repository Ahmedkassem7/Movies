
export default function Search({ searchTerm, setSearchTerm }) {
    return (
        <>
        <div className="container d-flex justify-content-between w-100">
            <input
                type="search"
                className="form-control px-3"
                style={{ width: "330px", height: "50px", backgroundColor: "rgba(232, 232, 232, 0.1)", color: "white" }}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div >
                <img src="https://th.bing.com/th/id/OIP.5MxizVjWEaUlIbsM0AiAGgHaFj?w=225&h=180&c=7&r=0&o=5&pid=1.7" alt="Admin Image"
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                <em className=" ms-md-2 sec-color">Admin</em>
            </div>
        </div>
        <hr/>
        </>
    );
}
