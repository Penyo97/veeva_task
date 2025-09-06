import {Pie, PieChart, Sector} from "recharts";
import type { SectorProps } from 'recharts/types';
import React from "react";
import {SellerPieChartContainer} from './ChartStyle.ts'


interface Props {
    name: string,
    data: any[]
}


type Coordinate = {
    x: number;
    y: number;
};

type PieSectorData = {
    percent?: number;
    name?: string | number;
    midAngle?: number;
    middleRadius?: number;
    tooltipPosition?: Coordinate;
    value?: number;
    paddingAngle?: number;
    dataKey?: string;
    payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

const renderActiveShape = ({
                               cx,
                               cy,
                               midAngle,
                               innerRadius,
                               outerRadius,
                               startAngle,
                               endAngle,
                               fill,
                               payload,
                               percent,
                               value,
                           }: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx || 0}
                cy={cy || 0}
                innerRadius={innerRadius || 0}
                outerRadius={outerRadius || 0}
                startAngle={startAngle || 0}
                endAngle={endAngle || 0}
                fill={fill}
            />
            <Sector
                cx={cx || 0}
                cy={cy || 0}
                startAngle={startAngle || 0}
                endAngle={endAngle || 0}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{value}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const SellerPieCharts = ({name, data}: Props) => {
    return (
        <SellerPieChartContainer>
            <h2>{name}</h2>
            <PieChart width={500} height={400}>
                <Pie
                    activeShape={renderActiveShape}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#29339B"
                    dataKey="buyCount"
                />
            </PieChart>
        </SellerPieChartContainer>
    )
}
export default SellerPieCharts