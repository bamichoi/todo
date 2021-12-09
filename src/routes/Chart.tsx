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
}
// 포매터ㅓㅓㅓㅓㅓ
function Chart({ coinId }:ChartProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return <div>{ isLoading ? ( "Loading Chart..." 
    ) : ( 
    <ApexChart 
        type="line"
        series={[
            {
                name: "price",
                data: data?.map(price => price.close),
            }

        ]}
        options={{
                theme:{
                    mode: "light"
                },
                chart:
                    {
                    height: 500,
                    width: 500,
                    toolbar:{
                        show: false
                    }
                },
                stroke: {
                    curve:"smooth",
                    width:3,
                },
                fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                  },
                  colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(2)}`
                    }
                },
                yaxis:{
                    show:false
                    
                },
                xaxis:{
                    type:"datetime",
                    categories: data?.map(price => price.time_close),
                    labels:{
                        style:{
                            colors:"#fbc531",
                        }
                    }
                }
            }}
        /> 
        )}
    </div>
}

export default Chart