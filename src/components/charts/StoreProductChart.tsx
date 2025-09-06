import {Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import {StoreChartContainer} from "./ChartStyle.ts";

interface Props {
    name: string,
    data: any[]
}

const StoreProductChart = ({data, name}: Props) => {


    return (
        <StoreChartContainer>
            <h2>{name}</h2>
        <BarChart
            width={450}
            height={320}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="buyCount" fill="#29339B"  activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </StoreChartContainer>
    )
}

export default StoreProductChart