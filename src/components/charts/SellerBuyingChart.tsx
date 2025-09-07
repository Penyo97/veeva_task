import {Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";

interface Props {
    data: any[]
}

const SellerBuyingChart = ({data}: Props) => {
  return(
      <BarChart
          width={600}
          height={350}
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
          <Bar dataKey="buyCount" name={"Selling"} fill="#29339B" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
      </BarChart>
  )
}

export default SellerBuyingChart