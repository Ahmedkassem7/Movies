import { useState } from "react";
import topGun from "/topGun.jpg";
import google from "/google.svg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { authenticateUser } from "../Api/UsersAPI";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user = await authenticateUser(values.email, values.password);
      console.log("User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage("Email or password is incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className="row p-0 m-0">
      <div
        className="col-lg-6 row justify-content-center align-items-center p-0 m-0"
        style={{
          backgroundColor: "#191919",
          color: "white",
          height: "100lvh",
        }}
      >
        <form onSubmit={formik.handleSubmit} className="col-lg-6 ">
          <div className="text-center">
            <h3>Welcome back</h3>
            <p className="text-white-50">
              Welcome back please enter your details
            </p>

            <span
              style={{
                backgroundColor: "#191919",
                position: "relative",
                top: "12px",
                padding: "0px 15px",
              }}
            >
              OR
            </span>
            <div
              style={{
                borderBottom: "1px solid white",
                margin: "3px 0px 20px",
                // width: "75%",
              }}
            ></div>

            <button
              type="button"
              className="w-75"
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
                <p className="text-danger text-start">{formik.errors.email}</p>
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

            <Link
              to="/forgot-password"
              className="d-flex justify-content-end text-light text-decoration-none mt-2 loEmail"
            >
              Forgot your password?
            </Link>

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
                  <>Login</>
                )}
              </button>
            </div>

            <p className="text-center mt-3 loEmail">
              Don’t have account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="col-12 col-lg-6 p-0 d-none d-lg-block">
        <img
          src={topGun}
          alt="TOP GUN"
          style={{ width: "100%", height: "100lvh", objectFit: "fill" }}
        />
      </div>
    </div>
  );
}
