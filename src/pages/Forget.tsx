import { ChangePassword } from "@/schema/yup";
import { TextField, Button, Card } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
export default function Forget(props: any) {
  console.log(props);

  const router = useRouter();

  const PasswordInitialValues = {
    new_password: "",
    comfirmPassword: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,

    handleSubmit,
  } = useFormik({
    initialValues: PasswordInitialValues,
    validationSchema: ChangePassword,
    onSubmit: async (value: any, action) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_Server}/${props.u}/forget/${props.t}`,
          {
            confirm_password: value.comfirmPassword,
            password: value.new_password,
          }
        );

        if (res.status == 200) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{
            backgroundColor: "black",
            padding: "10px",
            display: "grid",
            justifyContent: "center",
          }}
        >
          <div style={{ padding: "10px" }}>
            <TextField
              id="new_password"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              label="New Password"
              variant="outlined"
              onBlur={handleBlur}
              value={values.new_password}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
            ></TextField>
            {errors.new_password && touched.new_password ? (
              <p
                style={{
                  color: "white",
                }}
              >
                {errors.new_password.toLocaleString()}
              </p>
            ) : null}
          </div>
          <div style={{ padding: "10px" }}>
            <TextField
              id="comfirmPassword"
              inputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              label="Confim New Password"
              onBlur={handleBlur}
              value={values.comfirmPassword}
              onChange={handleChange}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "white",
                  },
              }}
            ></TextField>
            {errors.comfirmPassword && touched.comfirmPassword ? (
              <p
                style={{
                  color: "white",
                }}
              >
                {errors.comfirmPassword.toLocaleString()}
              </p>
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
export async function getServerSideProps(context: any) {
  const url = `${process.env.NEXT_PUBLIC_Server}/${context.query.u}/check/${context.query.t}`;
  try {
    const data = await axios.get(url);
    console.log(data);

    return {
      props: { u: context.query.u, t: context.query.t },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
      props: {},
    };
  }
}
