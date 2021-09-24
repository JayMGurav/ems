import { styled } from "@/styles/stitches.config";

const Container = styled("div", {
  maxWidth: "$5xl",
  mx: "auto",
  w: "$full",
  p: "$4",
});

const Main = styled("main", {
  w: "100%",
});

function Layout({ children }) {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
}

export default Layout;
