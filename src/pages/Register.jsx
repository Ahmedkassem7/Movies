import { useState } from "react";
import avatar from "/avatar.jpg";
import google from "/google.svg";
import { addNewUser } from "../Api/UsersAPI";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const RegisterSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const newUser = {
        ...values,
        role: "user",
      };
      const user = await addNewUser(newUser);
      console.log("New user registered:", user);
      navigate("/login");
    } catch (error) {
      if (error.message === "email already exists") {
        setErrorMessage("Email is already registered.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name min length is 3")
      .required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is requird"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: RegisterSubmit,
  });
  return (
    <div className="row p-0 m-0 bg-color-dark">
      <div className="col-lg-7 p-0 d-none d-lg-block">
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "100%", height: "100lvh", objectFit: "fill" }}
        />
      </div>
      {/* <div className="col-lg-4"> */}
      <div
        className="col-lg-5 row justify-content-center align-items-center p-0 m-0"
        style={{
          backgroundColor: "#191919",
          color: "white",
          height: "100lvh",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="col-12 col-md-6 col-lg-7 p-4 p-lg-0 "
        >
          <div className="text-center">
            <h3>Create an account</h3>
            <p className="text-white-50 text-center">
              Let's get started with your 30 days free trial.
            </p>

            <div className="mt-5">
              <input
                type="text"
                name="name"
                id="name"
                className=" form-control mt-3"
                placeholder="Enter your Name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-danger text-start">*{formik.errors.name}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-danger text-start">*{formik.errors.email}</p>
              )}
            </div>
            <div className="mt-3">
              <input
                type="password"
                name="password"
                className="form-control mt-4"
                placeholder="Enter Your Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-danger text-start">
                  {formik.errors.password}
                </p>
              )}
            </div>
            {errorMessage && (
              <div className="alert alert-danger text-center mt-2">
                {errorMessage}
              </div>
            )}
            <div className="mt-4 d-flex justify-content-center ">
              <button
                className="w-75 py-2 rounded-2 border-0"
                style={{ backgroundColor: "light", color: "black" }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                ) : (
                  <>Create account</>
                )}
              </button>
            </div>
            <button
              type="button"
              className="w-75 mt-2"
              style={{
                backgroundColor: "transparent",
                color: "white",
                marginBottom: "10px",
                border: "1px solid white",
                padding: "7px",
                borderRadius: "7px",
              }}
            >
              <img
                src={google}
                alt=""
                style={{ width: "25px", marginRight: "5px" }}
              />
              Log in with Google
            </button>
            <p className="text-center mt-3 loEmail text-white-50">
              Already have an account ?
              <Link to="/login" className="text-decoration-none">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
