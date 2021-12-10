import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


interface IPrice {
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
}

interface IPriceProps {
  tickersData? : IPrice
}

function Price( { tickersData } : IPriceProps) {
    return ( 
      <>
        <Overview>
          <OverviewItem>All time High Price:</OverviewItem>
          <OverviewItem>$ {tickersData?.ath_price}</OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>Price</OverviewItem>
          <OverviewItem>$ {tickersData?.price}</OverviewItem>
        </Overview>
        <Overview>
            <OverviewItem>Max Change rate in last 24h:</OverviewItem>
          <OverviewItem>$ {tickersData?.market_cap_change_24h}</OverviewItem>
        </Overview>
        <Overview>
            <OverviewItem>Change rate (last 30 Minutes):</OverviewItem>
          <OverviewItem>$ {tickersData?.percent_change_30m}</OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>Change rate (last 1 hours):</OverviewItem>
          <OverviewItem>$ {tickersData?.percent_change_1h}</OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>Change rate (last 12 hours):</OverviewItem>
          <OverviewItem>$ {tickersData?.percent_change_12h}</OverviewItem>
        </Overview>
        <Overview>
          <OverviewItem>Change rate (last 24 hours):</OverviewItem>
          <OverviewItem>$ {tickersData?.percent_change_24h}</OverviewItem>
        </Overview>
        
      </>
      )
}

export default Price