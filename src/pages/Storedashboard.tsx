import {useAppContext} from "../context/AppContext.tsx";
import {JSX, useEffect, useState} from "react";
import {calculateSellNumberBy} from "../utilities/functions.ts";
import {Spin} from "antd";
import SellerBuyingChart from "../components/charts/SellerBuyingChart.tsx";
import StoreProductChart from "../components/charts/StoreProductChart.tsx";


interface Seller {
  name: string;
  buyCount: number;
}

const storeNameTranslator = (name: string) => {
  switch (name) {
    case "VK1000000001001": return "Alle"
    case "VK1000000001002": return "Arena Mall"
    case "VK1000000001003": return "Mammut"
    case "VK1000000001004": return "Westend"
  }
}

interface StoreShopData {
  shopName: string,
  products: {
    name: string,
    buyCount: string,
  }[]
}

const Storedashboard = () => {
  const {fetchData} = useAppContext()
  const [sellerBuyCount,setSellerBuyCount] = useState<Array<Seller>>([])
  const [storeProductBuy,setStoreProductBuy] = useState<Array<StoreShopData>>([])

  useEffect(()=> {
    fetchData<any>("SELECT store_fk__cr.name__v FROM order__c").then(value => {
      setSellerBuyCount(calculateSellNumberBy(value,"store_fk__cr.name__v"))
    })
    fetchData<any>("SELECT order_fk__cr.store_fk__c,product_fk__cr.name__v, order_quantity__c FROM order_products_connection__c").then(value => {
      setStoreProductBuy(transformData(value))
    })
  },[])


  function transformData(data: any[]): StoreShopData[] {
    const map = new Map<string, Map<string, number>>();

    for (const row of data) {
      const store = storeNameTranslator(row["order_fk__cr.store_fk__c"]);
      const product = row["product_fk__cr.name__v"];

      if (!map.has(store)) {
        map.set(store, new Map());
      }

      const productMap = map.get(store)!;
      productMap.set(product, (productMap.get(product) || 0) + row["order_quantity__c"]);
    }

    const result: StoreShopData[] = [];
    for (const [store, productMap] of map) {
      result.push({
        shopName: store,
        products: [...productMap.entries()].map(([store, count]) => ({
          name: store,
          buyCount: count
        }))
      });
    }

    return result;
  }

  const storeProductList: JSX.Element[] = storeProductBuy.map(store => <StoreProductChart name={store.shopName} data={store.products}/>);

  if (sellerBuyCount.length === 0 || storeProductBuy.length === 0) {
    return <Spin/>
  }

  return(
      <>
        <h2 style={{marginLeft: 70}}>Number of sales broken down by store</h2>
        <SellerBuyingChart data={sellerBuyCount}/>
        <h2 style={{marginLeft: 70}}>Number of sales broken down by product</h2>
        <div style={{display: "flex"}}>
        {storeProductList}
        </div>
      </>
  )
}

export default Storedashboard