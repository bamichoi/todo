import { useQuery } from "react-query"
import { fetchCoinHistory } from "./api"
import ApexChart from "react-apexcharts";

interface IHistorical  {
    time_open: string;  
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume:number;
    market_cap: number;
}
interface ChartProps {
    coinId:string;
    theme: string;
}


// 포매터ㅓㅓㅓㅓㅓ
function Chart({ coinId, theme }:ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return <div>{ isLoading ? ( "Loading Chart..." 
    ) : ( 
    <ApexChart 
        type="candlestick"
        series={[
            {
                name: "price",
                data: data?.map(price =>({
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close]
                }))
            }
        ]}
        options={{
                theme:{
                    mode: theme === "lightTheme" ? "light" : "dark" 
                },
                chart:
                    {
                    type: 'candlestick',
                    height: 500,
                    width: 500,
                    toolbar:{
                        show: true
                    }
                },
                stroke: {
                    width:1,
                },
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(2)}` 
                    }
                },
                yaxis:{
                    show:false,         
                },
                xaxis:{
                    type:"datetime",
                    categories: data?.map(price => price.time_close),
                    labels:{
                        style:{
                            colors: theme === "lightTheme" ? "#fbc531" : "#f5f6fa",
                        }
                    }
                }
            }}
        /> 
        )}
    </div>
}

export default Chart