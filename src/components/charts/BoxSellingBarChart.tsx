import {Bar, BarChart, CartesianGrid, Legend, Rectangle, XAxis, YAxis, Tooltip} from "recharts";

interface Props {
    data: any[]
}

const BoxSellingBarChart = ({data}: Props) => {
    return (
        <BarChart
            width={600}
            height={400}
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
            <Legend/>
            <Bar dataKey="number" name={"Purchase"} fill="#29339B" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
        </BarChart>)
}

export default BoxSellingBarChart;