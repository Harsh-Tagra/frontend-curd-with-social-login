import { Alert, Button, Card, Divider, InputBase } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/reg.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useFormik } from "formik";
import { Regsehema } from "@/schema/yup";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Reg = () => {
  const [res, setres] = useState({
    status: 0,
    msg: "",
  });
  const submit = async (value: object) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_Server}/reg`,
        value
      );
      setres({ status: res.status, msg: res.data.msg });
    } catch (error: any) {
      if (error.response.status == 409) {
        setres({ status: error.response.status, msg: error.response.data.msg });
      }
    }
  };
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,

    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Regsehema,
    onSubmit: (value, action) => {
      submit(value);
    },
  });

  return (
    <div className={styles.main}>
      <Card className={styles.card}>
        <h1 style={{ color: "white", textAlign: "center", margin: "8px" }}>
          sing up
        </h1>
        <div style={{ display: "flex" }}>
          <form style={{ width: "57%" }} onSubmit={handleSubmit}>
            <InputBase
              id="name"
              autoComplete="off"
              className={styles.input}
              placeholder="name"
              value={values.name}
              onBlur={handleBlur}
              type="text"
              onChange={handleChange}
              sx={{ input: { color: "white" } }}
            ></InputBase>
            {errors.name && touched.name ? (
              <p style={{ color: "green", margin: "0px 0px 0px 25px" }}>
                {errors.name}
              </p>
            ) : null}
            <InputBase
              className={styles.input}
              placeholder="Email"
              id="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              sx={{ input: { color: "white" } }}
            ></InputBase>
            {errors.email && touched.email ? (
              <p style={{ color: "green", margin: "0px 0px 0px 25px" }}>
                {errors.email}
              </p>
            ) : null}
            <InputBase
              className={styles.input}
              placeholder="Password"
              type="password"
              onBlur={handleBlur}
              id="password"
              value={values.password}
              onChange={handleChange}
              sx={{ input: { color: "white" } }}
            ></InputBase>
            {errors.password && touched.password ? (
              <p style={{ color: "green", margin: "0px 0px 0px 25px" }}>
                {errors.password}
              </p>
            ) : null}
            <InputBase
              className={styles.input}
              placeholder="Comfirn Password"
              type="text"
              onBlur={handleBlur}
              id="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              sx={{ input: { color: "white" } }}
            ></InputBase>
            {errors.confirm_password && touched.confirm_password ? (
              <p style={{ color: "green", margin: "0px 0px 0px 25px" }}>
                {errors.confirm_password}
              </p>
            ) : null}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {res.status == 200 ? (
                <Alert severity="success" style={{ width: "82%" }}>
                  {res.msg}
                </Alert>
              ) : res.status == 409 ? (
                <Alert severity="warning" style={{ width: "82%" }}>
                  {res.msg}
                </Alert>
              ) : (
                <></>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button color="success" type="submit" className={styles.Button}>
                LOGIN
              </Button>
            </div>
          </form>
          <div style={{ display: "flex", alignItems: "center", width: "43%" }}>
            <Divider
              orientation="vertical"
              style={{ backgroundColor: "grey", height: "90%" }}
            ></Divider>
            <div
              style={{
                display: "flex",
                height: "80%",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <h1 style={{ color: "white", textAlign: "center" }}>
                Continue With{" "}
              </h1>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  height: "50%",
                  alignContent: "space-around",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_Server}/auth/google`,
                      "_self"
                    );
                  }}
                  color="error"
                  style={{ width: "90%" }}
                  startIcon={<GoogleIcon />}
                >
                  Google+
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_Server}/auth/facebook`,
                      "_self"
                    );
                  }}
                  style={{ width: "90%" }}
                  startIcon={<FacebookIcon />}
                >
                  Facebook
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_Server}/auth/github`,
                      "_self"
                    );
                  }}
                  color="inherit"
                  style={{ width: "90%" }}
                  startIcon={<GitHubIcon />}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Reg;
