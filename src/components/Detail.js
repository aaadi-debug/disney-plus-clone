import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from "react-router-dom"
import db from "../firebase"

const Detail = () => {
    const { id } = useParams();
    const [ movie, setMovie] = useState({});

     useEffect(() => {
        // Grab the movie info from db
        db.collection("movies")
        .doc(id)
        .get()
        .then((doc) => {
            if(doc.exists) {
                //save the movie data
                setMovie(doc.data());
            } else {
                // redirect to homepage
            }
        })
     }, [id]) 

    // console.log("Movie is ", movie);

    return (
        <Container>
            <Background>
                <img src={movie.backgroundImg} />
            </Background>
            <ImageTitle>
                <img src={movie.titleImg} />
            </ImageTitle>
            <Controls>
                <PlayButton>
                    <img src="/images/play-icon-black.png" alt="play-button" />
                    <span>PLAY</span>
                </PlayButton>
                <TrailorButton>
                    <img src="/images/play-icon-white.png" alt="play-button" />
                    <span>TRAILOR</span>
                </TrailorButton>
                <AddButton>
                    <span>+</span>
                </AddButton>
                <GroupWatchButton>
                    <img src="/images/group-icon.png" />
                </GroupWatchButton>
            </Controls>
            <SubTitle>
                {movie.subTitle}
            </SubTitle>
            <Description>
                {movie.description}
            </Description>
        </Container>
    )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    width: 0 calc(3.5vw + 5px);
    position: relative;
`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        ${'' /* object-fit: cover; */}
    }
`
const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 170px;
    margin: 30px;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`
const Controls = styled.div`
    display: flex;
    margin-left: 24px;
    align-items: center;
`
const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    padding: 0px 24px;
    margin-right: 22px;
    display: flex;
    align-items: center;
    height: 56px;
    background-color: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
    background-color: rgb(198, 198, 198);
    }
`
const TrailorButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);

    &:hover {
        color: #000;
    }
`
const AddButton = styled.button`
    width: 44px;
    height: 44px;
    display: flex;
    margin-right: 16px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span{
        font-size: 30px;
        color: #ffff;
    }
`
const GroupWatchButton = styled(AddButton)`
    background: rgb(0, 0, 0);
`
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
    margin-left: 24px;
`
const Description = styled.div`
    line-height: 1.4;
    color: rgb(249, 249, 249);
    font-size: 20px;
    margin-top: 16px;
    margin-left: 24px;
`