export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <>
      {/* <div className=" container-md d-flex justify-content-between w-100"> */}
      <div className="row justify-content-between p-0 m-0">
        <div className="col-lg-4 ">
          <input
            type="search"
            className="form-control px-3 "
            style={{
              backgroundColor: "rgba(232, 232, 232, 0.1)",
              color: "white",
            }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-lg-4  d-flex justify-content-end align-items-center">
          <img
            src="https://th.bing.com/th/id/OIP.5MxizVjWEaUlIbsM0AiAGgHaFj?w=225&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Admin Image"
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          />
          <em className=" ms-md-2 sec-color">Admin</em>
        </div>
        {/* <input
            type="search"
            className="form-control px-3 col-lg-4 col-md-5 col-xl-4"
            style={{
              backgroundColor: "rgba(232, 232, 232, 0.1)",
              color: "white",
            }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="col-lg-4 ">
            <img
              src="https://th.bing.com/th/id/OIP.5MxizVjWEaUlIbsM0AiAGgHaFj?w=225&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Admin Image"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <em className=" ms-md-2 sec-color">Admin</em>
          </div> */}
      </div>
      {/* </div> */}
      <hr />
    </>
  );
}
