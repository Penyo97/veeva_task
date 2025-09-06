import {Bar, BarChart, CartesianGrid, Legend, Rectangle, XAxis, YAxis, Tooltip } from "recharts";
import type {ReactNode} from "react";

interface Props {
    data: any[]
}


const BoxPurchasePerDay = ({data} : Props) => {
        return(
                <BarChart
                    width={1800}
                    height={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"  tickFormatter={(date) => new Date(date).toLocaleDateString()}/>
                    <YAxis/>
                    <Tooltip content={CustomTooltip}/>
                    <Legend />
                    <Bar dataKey="blue" fill="#30BCED" label={{ position: 'top' }} activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="green" fill="#00BD9D" label={{ position: 'top' }} activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="red" fill="#FC5130" label={{ position: 'top' }} activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
        )
}


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: 10 }}>
                <p><strong>{(label as string).replace("T"," ").replace("Z","")}</strong></p>
            </div> as ReactNode
        );
    }
    return null;
};

export default BoxPurchasePerDay