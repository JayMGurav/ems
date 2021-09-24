import Link from "next/link";

import { styled } from "@stitches/react";
import Anchor from "@/styledComponents/Anchor";

const Div = styled("div", {
  textAlign: "center",
  my: "$10",
});

export default function Hr() {
  return (
    <Div>
      <h1>Hr Portal</h1>
      <Link href="/hr/signin" passHref>
        <Anchor color="blue">← Login</Anchor>
      </Link>
      <Link href="/hr/signup" passHref>
        <Anchor color="blue">Register →</Anchor>
      </Link>
    </Div>
  );
}
