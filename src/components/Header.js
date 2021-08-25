import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import styled from "styled-components";
import HeaderNavMenu from "./HeaderNavMenu";
import { useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        console.log(user);
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Nav>
      <Logo src="/images/logo.svg"></Logo>
      {/* {!userName ? (
        <>
          <LoginContainer>
            <Login onClick={signIn}>Login</Login>
          </LoginContainer>
        </>
      ) : ( */}
      <NavMenu>
        <HeaderNavMenu img="/images/home-icon.svg" span="HOME"></HeaderNavMenu>
        <HeaderNavMenu
          img="/images/watchlist-icon.svg"
          span="WATCHLIST"
        ></HeaderNavMenu>
        <HeaderNavMenu
          img="/images/original-icon.svg"
          span="ORIGINALS"
        ></HeaderNavMenu>
        <HeaderNavMenu
          img="/images/movie-icon.svg"
          span="MOVIE"
        ></HeaderNavMenu>
        <HeaderNavMenu
          img="/images/series-icon.svg"
          span="SERIES"
        ></HeaderNavMenu>
      </NavMenu>
      <UserImg src="/images/dp.png" />
      {/* onClick={signOut} */}
      {/* )} */}
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background-color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
