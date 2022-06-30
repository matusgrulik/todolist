import { NavLink } from "react-router-dom";
import { themes } from "./Theme";
import styled from "styled-components";
const NavLinkStyled = styled(NavLink)`
  color: ${themes.primaryColor};
  font-weight: bold;
  text-decoration: none;
  font-size: 1.2em;
  &.active {
    color: ${themes.secondaryColor};
  }
`;
export const LinkAll = () => {
  return <NavLinkStyled to="/todolist/all">All</NavLinkStyled>;
};

export const LinkActive = () => {
  return <NavLinkStyled to="/todolist/active">Active</NavLinkStyled>;
};
export const LinkCompleted = () => {
  return <NavLinkStyled to="/todolist/completed">Completed</NavLinkStyled>;
};
