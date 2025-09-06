
export const calculateSellNumberBy = (value: any[], nameProp: string) => {
    const counts = {}
    value.forEach(item => {
        let name =  item[nameProp]
        counts[name] = (counts[name] || 0) + 1;
    })
    return Object.entries(counts).map(([key, value]) => ({
        name: key,
        buyCount: value as number
    }));
}