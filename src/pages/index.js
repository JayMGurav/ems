import Head from "next/head";
import Link from "next/link";

import Anchor from "@/styledComponents/Anchor";
import { styled } from "@stitches/react";

const Div = styled("div", {
  textAlign: "center",
  my: "$10",
});

export default function Home() {
  return (
    <Div>
      <h1>EMS</h1>
      <Link href="/employee" passHref>
        <Anchor color="blue">Employee Sign in</Anchor>
      </Link>
      <Link href="/hr/signin" passHref>
        <Anchor color="blue">Hr Sign in</Anchor>
      </Link>
    </Div>
  );
}
