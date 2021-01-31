import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import Home from "./Home";
import Navbar from "./Navbar";
import Form from "./Form";
import styled from "styled-components";
import Login from "./Login";

const Container = styled.div`
  max-width: 900px;
  padding: 0 2rem;
  margin: auto;
`;

function App() {
  return (
    <>
      <GlobalStyle />

      <Router>
        <Route exact path="/">
          <Navbar />
          <Container>
            <Home />
          </Container>
        </Route>
        <Route exact path="/form">
          <Navbar />
          <Container>
            <Form />
          </Container>
        </Route>
        <Route path="/form/:id">
          <Navbar />
          <Container>
            <Form />
          </Container>
        </Route>
        <Route path="/login">
          <Container>
            <Login />
          </Container>
        </Route>
      </Router>
    </>
  );
}

export default App;
