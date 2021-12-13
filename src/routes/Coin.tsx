import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useEffect, useState,  } from "react";
import { useParams, useLocation, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchPriceInfo } from "./api";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";

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
    justify-content: space-evenly;
    align-items: center;
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  width: 30px;
  height:30px;
  border-radius:15px;
  display:flex;
  justify-content:center;
  align-items:center;
  border:none;
  color: ${props=> props.theme.textColor};
  cursor: pointer;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive : boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color : ${props => props.isActive ? props.theme.accentColor : props.theme.textColor };
  a {
    display: block;
  }
`;

interface RouteParams {
    coinId:string;
}

interface RotueState {
    name : string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
}

interface ICoinProps {
 
}

function Coin({}:ICoinProps) {
    const setDarkAtom = useSetRecoilState(isDarkAtom)
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const isDark = useRecoilValue(isDarkAtom)
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RotueState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
        ["info", coinId], () => fetchCoinInfo(coinId),);
    const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
      ["tickers", coinId], () => fetchPriceInfo(coinId),
        {
            refetchInterval: 5000,
        }
        );
    const loading = infoLoading || tickersLoading;
    /* const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    useEffect(() => {
        (async() => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
                ).json();
                console.log(infoData);
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
                ).json();
                console.log(priceData);  
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false)
        })();
    }, [coinId]) */
    return (
    <Container>
        <Helmet>
            <title>CrpytoTracker | {state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name} </title>
        </Helmet>
        <Header>
            <Link to={"/"}>
              <Button>
                  <i className="fas fa-arrow-left"></i> 
                </Button>
            </Link>
            <Title>
            {state?.name ? state.name : infoLoading ? "Loading..." : infoData?.name}
            </Title>
            <Button onClick={toggleDarkAtom}>
              { isDark ? ( <i className="fas fa-sun"></i> ) : ( <i className="fas fa-moon"></i> ) }
            </Button>
        </Header>
        { loading ? ( <Loader>Loading...</Loader>) : 

        (
            <>
              <Overview>
                <OverviewItem>
                  <span>Rank:</span>
                  <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Symbol:</span>
                  <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Price:</span>
                  <span>$ {tickersData?.quotes.USD.price.toFixed(8)}</span>
                </OverviewItem>
              </Overview>
              <Description>{infoData?.description}</Description>
              <Overview>
                <OverviewItem>
                  <span>Total Suply:</span>
                  <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                  <span>Max Supply:</span>
                  <span>{tickersData?.max_supply}</span>
                </OverviewItem>
              </Overview>
              <Tabs>
                  <Tab isActive={ chartMatch !== null }>
                    <Link to={`/${coinId}/chart`}>
                        Chart
                    </Link>
                    </Tab>
                  <Tab isActive={ priceMatch !== null }>
                    <Link to={`/${coinId}/price`}>
                        Price
                    </Link>
                  </Tab>
              </Tabs>
              
              <Switch>
                <Route path={`/:coinId/price`} >
                    <Price tickersData={ tickersData?.quotes.USD } />
                </Route>
                <Route path={`/:coinId/chart`}>
                    <Chart coinId={ coinId } />
                </Route>
              </Switch>
            </>
            )}
        </Container>

)}


export default Coin;

