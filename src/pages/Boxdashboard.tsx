import {useAppContext} from "../context/AppContext.tsx";
import {JSX, useEffect, useState} from "react";
import {DashBoardContainer, CardFlexBox} from './DashBoardStyle.ts'
import BoxCard from "../components/charts/BoxCard.tsx";
import BoxSellingBarChart from "../components/charts/BoxSellingBarChart.tsx";
import BoxPurchasePerDay from "../components/charts/BoxPurchasePerDay.tsx";
import {Spin} from "antd";

interface Product {
    id: number,
    name__v: string,
    brand_color_code__v: string,
    cost__v: number,
    product_value__v: number
}

interface BoxSellingNumber {
    name: string,
    number: number
}

interface BoxPurchasePerDayInt {
    "order_fk__cr.order_date__c": string,
    "product_fk__cr.name__v": string,
    order_quantity__c: number
}

interface BoxPurchasePerDayChart {
    date: string,
    blue: number,
    green: number,
    red: number;
}


const Boxdashboard = () => {
    const [products, setProducts] = useState<Array<Product>>([])
    const [sellingNumber, setSellingNumber] = useState<Array<BoxSellingNumber>>([])
    const [boxPurchase, setBoxPurchase] = useState<Array<BoxPurchasePerDayChart>>([])
    const {fetchData} = useAppContext()
    const cardList: JSX.Element[] = products.map(product => <BoxCard title={product.name__v}
                                                                     boxProfit={product.cost__v - product.product_value__v}
                                                                     sellNumber={sellingNumber.find(item => item.name === product.name__v)?.number}/>);

    useEffect(() => {
        fetchData<Product>("SELECT id, name__v, brand_color_code__v, cost__v, product_value__v  FROM product__v").then(value => {
            setProducts(value)
        })
        fetchData<any>("SELECT product_fk__cr.name__v, order_quantity__c FROM order_products_connection__c").then(value => {
            setSellingNumber([{
                name: "Blue Box",
                number: calculateBoxSellingNumber(value, "Blue Box")
            },
                {
                    name: "Green Box",
                    number: calculateBoxSellingNumber(value, "Green Box")
                },
                {
                    name: "Red Box",
                    number: calculateBoxSellingNumber(value, "Red Box")
                }])
        })
        fetchData<BoxPurchasePerDayInt>("SELECT order_fk__cr.order_date__c, product_fk__cr.name__v, order_quantity__c FROM order_products_connection__c").then(value => {
            const arr: BoxPurchasePerDayChart[] = []
            value.forEach(item => {
                let el: BoxPurchasePerDayChart = {
                    blue: 0,
                    green: 0,
                    red: 0,
                    date: item["order_fk__cr.order_date__c"],
                }
                if (item["product_fk__cr.name__v"] === "Blue Box") {
                    el.blue = item.order_quantity__c
                } else if (item["product_fk__cr.name__v"] === "Green Box") {
                    el.green = item.order_quantity__c
                } else {
                    el.red = item.order_quantity__c
                }
                arr.push(el)
            })
            setBoxPurchase(arr)
        })
    }, [])


    const calculateBoxSellingNumber = (value: any[], boxName: string) => {
        let number = 0;
        value.forEach(item => {
            if (item["product_fk__cr.name__v"] === boxName) {
                number += item.order_quantity__c
            }
        })
        return number;
    }


    if (sellingNumber.length === 0 && boxPurchase.length === 0) {
        return <Spin/>
    }


    return (
        <DashBoardContainer>
            <div style={{display: "flex"}}>
                <div>
                    <h2 style={{marginLeft: 70, marginBottom: 10}}>Total Box Purchase</h2>
                    <BoxSellingBarChart data={sellingNumber}/>
                </div>
                <CardFlexBox>
                    {cardList}
                </CardFlexBox>
            </div>
            <h2 style={{marginLeft: 70, marginBottom: 3}}>Box Purchase / Day</h2>
            <BoxPurchasePerDay data={boxPurchase}/>
        </DashBoardContainer>
    )
}

export default Boxdashboard

