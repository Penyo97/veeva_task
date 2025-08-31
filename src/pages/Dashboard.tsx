import Header from "../components/Header.tsx";
import {useAppContext} from "../context/AppContext.tsx";
import {JSX, useEffect, useState} from "react";
import {DashBoardContainer, CardFlexBox} from './DashBoardStyle.ts'
import Card from "../components/charts/Card.tsx";
import card from "../components/charts/Card.tsx";

interface Product {
    id: number,
    name__v: string,
    brand_color_code__v: string,
    cost__v: number,
    quantity_per_case__v: number
}


const Dashboard = () => {
    const [products, setProducts] = useState<Array<Product>>([])
    const {fetchData} = useAppContext()
    const cardList: JSX.Element[] = products.map(product => <Card title={product.name__v} stockNumber={product.quantity_per_case__v}/>);

    useEffect(() => {
        fetchData<Product>("SELECT id, name__v, brand_color_code__v, cost__v, quantity_per_case__v  FROM product__v").then(value => {
            setProducts(value)
        })
    }, [])


    return (
        <DashBoardContainer>
            <Header/>
            <CardFlexBox>
                {cardList}
            </CardFlexBox>
        </DashBoardContainer>
    )
}

export default Dashboard

