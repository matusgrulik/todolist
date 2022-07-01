import { FaClipboardList } from "react-icons/fa";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { TodoApp } from "./ToDoList/TodoApp";
import { appUrls } from "./config";
import styled from "styled-components";

const DivWrapper = styled.div`
  display: flex;
  font-size: 1.4em;
  font-weight: bold;
  margin: 2em;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media (max-width: 950px) {
    text-align: center;
    flex-direction: column;
  }
  @media (max-width: 1865px) {
    font-size: 1.3em;
  }
`;
const LinkNav = styled(Link)`
  max-width: 13%;
  text-align: center;
  font-family: Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif;
  margin: 0.8em;
  text-decoration: none;
  color: #000000;
  text-transform: uppercase;

  @media (max-width: 950px) {
    max-width: 100%;
    margin: 0.5em;
  }
  @media (max-width: 1740px) {
    margin: 0.5em;
  }
`;
const TextDiv = styled.div`
  max-width: 100%;
`;
export default function App() {
  return <TodoApp />;
}
