import {useAppContext} from "../context/AppContext.tsx";
import {JSX, use, useEffect, useState} from "react";
import {CardFlexBox, DashBoardContainer} from "./DashBoardStyle.ts";
import SellerCard from "../components/charts/SellerCard.tsx";
import {Spin} from "antd";
import SellerBuyingChart from "../components/charts/SellerBuyingChart.tsx";
import SellerPieCharts from "../components/charts/SellerPieCharts.tsx";
import {calculateSellNumberBy} from "../utilities/functions.ts";

interface Seller {
    name: string;
    buyCount: number;
}


interface SellerShopData {
    name: string,
    shops: {
        name: string,
        buyCount: string,
    }[]
}

const Sellerdashboard = () => {
    const {fetchData} = useAppContext()
    const [sellerBuyCount,setSellerBuyCount] = useState<Array<Seller>>([])
    const [sellerWithShop, setSellerWithShop] = useState<Array<SellerShopData>>([])


    useEffect(()=> {
        fetchData<any>("SELECT seller_fk__cr.name__v FROM order__c").then(value => {
           setSellerBuyCount(calculateSellNumberBy(value,"seller_fk__cr.name__v"))
        })
        fetchData<any>("SELECT seller_fk__cr.name__v,store_fk__cr.name__v  FROM order__c").then(value => {
            setSellerWithShop(transformData(value))
        })
    },[])



    function transformData(data: any[]): SellerShopData[] {
        const map = new Map<string, Map<string, number>>();

        for (const row of data) {
            const seller = row["seller_fk__cr.name__v"];
            const store = row["store_fk__cr.name__v"];

            if (!map.has(seller)) {
                map.set(seller, new Map());
            }

            const storeMap = map.get(seller)!;
            storeMap.set(store, (storeMap.get(store) || 0) + 1);
        }

        const result: SellerShopData[] = [];
        for (const [seller, storeMap] of map) {
            result.push({
                name: seller,
                shops: [...storeMap.entries()].map(([store, count]) => ({
                    name: store,
                    buyCount: count
                }))
            });
        }

        return result;
    }

    const sellerShopList: JSX.Element[] = sellerWithShop.map(seller => <SellerPieCharts name={seller.name} data={seller.shops}/>);


    if (sellerBuyCount.length === 0 && sellerWithShop.length === 0) {
        return <Spin/>
    }

  return(
      <DashBoardContainer>
          <div style={{display: "flex"}}>
              <div>
              <h2 style={{marginLeft: 70, marginBottom: 3}}>Seller purchase number</h2>
              <SellerBuyingChart data={sellerBuyCount}/>
              </div>
              <CardFlexBox>
                  <SellerCard title="Best Seller" name={sellerBuyCount.reduce((a, b) => a.buyCount > b.buyCount ? a : b).name} />
                  <SellerCard title="Worst Seller" name={sellerBuyCount.reduce((a, b) => a.buyCount < b.buyCount ? a : b).name} />
              </CardFlexBox>
          </div>
          <h2 style={{marginLeft: 70}}>Number of sales broken down by store</h2>
          <div style={{display: "flex"}}>
              {sellerShopList}
          </div>
      </DashBoardContainer>
  )
}

export default Sellerdashboard