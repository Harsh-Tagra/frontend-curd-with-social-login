import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const verfication = () => {
  return <></>;
};

export default verfication;
export async function getServerSideProps(context: any) {
  const url = `${process.env.NEXT_PUBLIC_Server}/${context.query.u}/verfiy/${context.query.t}`;
  try {
    const data = await axios.get(url);
    console.log(data);

    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
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
