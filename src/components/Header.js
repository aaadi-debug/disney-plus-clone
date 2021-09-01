import React, { useEffect } from 'react'
import { auth, provider } from "../firebase"
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import {
    selectUserName,
    selectUserPhoto,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        OAuth.onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                }))
                history.push('/')
            }
        })
    })

    const  signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user
            console.log(result);
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }))
            history.push('/')
        }) 
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut());
            history.push("/login")
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" />

            {
                !userName ? (
                    <LoginContainer>
                        <Login onClick={signIn}>Login</Login>
                    </LoginContainer>
                ) : 
                <>
                    <NavMenu>
                        <a href="">
                            <img src="/images/home-icon.svg" />
                            <span>HOME</span>
                        </a>
                        <a href="">
                            <img src="/images/search-icon.svg" />
                            <span>SEARCH</span>
                        </a>
                        <a href="">
                            <img src="/images/watchlist-icon.svg" />
                            <span>Watchlist</span>
                        </a>
                        <a href="">
                            <img src="/images/original-icon.svg" />
                            <span>ORIGINALS</span>
                        </a>
                        <a href="">
                            <img src="/images/movie-icon.svg" />
                            <span>MOVIES</span>
                        </a>
                        <a href="">
                            <img src="/images/series-icon.svg" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <UserImg 
                        onClick={signOut}
                        src="https://yt3.ggpht.com/yti/APfAmoE9ZR6FJsmpy4aYH8E9BGMKFish-coIOVlC4d128g=s88-c-k-c0x00ffffff-no-rj-mo" />
                </>
            }

            
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo  = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }
        span { 
            color: #fff;
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            ${'' /* border-bottom: 2px solid #fff; */}

            &:after {
                content: '';
                height: 2px;
                background: #fff;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;   
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scale(0.5);
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`