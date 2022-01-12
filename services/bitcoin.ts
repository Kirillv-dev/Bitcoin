import { IBitcoin } from '../interfaces/Bitcoin'; 

let bitcoin: IBitcoin= {
    price: 100.00,
    updatedAt: new Date().toISOString()
};  

const getPrice = ():number => bitcoin.price;

const updateBitcoinPrice = (price:number) => {
    try {
        const date = new Date().toISOString(); 

        const newPrice: IBitcoin = { 
            price,
            updatedAt: date
        };

        bitcoin = newPrice;  
        return newPrice;
    } catch (e) {
        throw Error (e);
    };
}; 

const getBitcoin = () => {
    try {
       return bitcoin;
    } catch (e) {
        throw Error (e);
    };
}; 
 
export default { 
    getPrice, 
    updateBitcoinPrice, 
    getBitcoin
};