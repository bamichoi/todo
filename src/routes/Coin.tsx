import styled from "styled-components";
import { useEffect, useState,  } from "react";
import { useParams, useLocation } from "react-router-dom";


const Title = styled.h1`
     color: ${props => props.theme.textColor};
     font-size: 48px;
     margin-bottom: 30px;
     margin-top: 30px;
`;

const Container = styled.div`
    padding:0px 10px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;


interface RouteParams {
    coinId:string;
}

interface RotueState {
    name : string;
}

function Coin() {
    const { coinId } = useParams<RouteParams>();
    const [loading, setLoading] = useState(true);
    const { state } = useLocation<RotueState>();
    return (
    <Container>
        <Header>
            <Title>
                {state?.name || "Loading..."}
            </Title>
        </Header>
        { loading ? ( <Loader>Loading...</Loader>) : null }
        </Container>

)}


export default Coin;

