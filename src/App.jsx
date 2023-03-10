import { useState } from "react";
import "./App.css";
import { CategoryForm } from "./components/CategoryForm/CategoryForm";
import { Container } from "./components/Container/Container";
import { Header } from "./components/Header/Header";
import Modal from "./components/Modal/Modal";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  const [route, setRoute] = useState("Home");

  return (
    <div className="App">
      <Navbar setRoute={setRoute} />
      <div className="container">
        <Header />
        <Container route={route} />
      </div>
    </div>
  );
}

export default App;
