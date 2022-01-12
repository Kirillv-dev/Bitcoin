import User from './../core/user/index';
import { IUser } from '../interfaces/User';
import { tradeBitcoinEnum } from '../enums/tradeBitcoin.enum'; 
import { updateBalanceEnum } from '../enums/updateBalance.enum';
import bitcoinService from './bitcoin';   

export const updateBalance = (id:string, action:string, amount:number) => {
    try { 
        const foundUser:IUser = User.selectUser(id);  
         if (!foundUser){  
            throw Error("/404/This user doesn't exist")
        }; 
        if (foundUser.usdBalance < amount && action === updateBalanceEnum.withdraw){  
            throw Error("/402/You don't have enough money")
        };    

        let newUsdBalance:number = foundUser.usdBalance; 
        if (action === updateBalanceEnum.withdraw) newUsdBalance = newUsdBalance - amount; 
        else newUsdBalance += amount;

        const date:string = new Date().toISOString();
        const updatedUser:IUser = { 
            ...foundUser,
            usdBalance: newUsdBalance,
            updatedAt: date
        };   

        User.deleteUser(id);
        User.addUser(updatedUser);

        return updatedUser;

    } catch (e) {
        throw Error(e)
    };
}; 

export const tradeBitcoin = (id:string, action:string, amount:number) => {
    try {
        const foundUser:IUser = User.selectUser(id);   

        if (!foundUser) { 
            throw Error("/404/This user doesn't exist");
        };

        const bitcoinPrice = bitcoinService.getPrice();  
        const actionCost = bitcoinPrice * amount; 

        if (foundUser.usdBalance < actionCost && action === tradeBitcoinEnum.buy){   
            throw Error("/402/You don't have enough money"); 
        } else if (foundUser.bitcoinAmount < amount && action === tradeBitcoinEnum.sell ){  
            throw Error("/402/You don't have enough bitcoins"); 
        };  

        let newUsdBalance:number = foundUser.usdBalance;  
        let newBitcoinBalance:number = foundUser.bitcoinAmount;  
        if (action === tradeBitcoinEnum.buy){ 
            newUsdBalance = newUsdBalance - actionCost;   
            newBitcoinBalance = newBitcoinBalance + amount;
        } else{ 
            newUsdBalance = newUsdBalance + actionCost; 
            newBitcoinBalance = newBitcoinBalance - amount;
        };

        const date:string = new Date().toISOString();
        const updatedUser:IUser = { 
            ...foundUser,
            bitcoinAmount: newBitcoinBalance,
            usdBalance: newUsdBalance,
            updatedAt: date
        };   

        User.deleteUser(id);
        User.addUser(updatedUser);

        return updatedUser; 
    } catch (e) {
        throw Error(e)
    }
};

export const getBalance = (userId: string) => {
    try {   
        const foundUser:IUser = User.selectUser(userId);  
        if (!foundUser){  
            throw Error("/404/This user doesn't exist"); 
        };
        const bitcoinPrice:number = bitcoinService.getPrice(); 
        const totalBalance:number = (foundUser.bitcoinAmount * bitcoinPrice) + foundUser.usdBalance;
        return {balance: totalBalance};
    } catch (e) {  
        throw Error(e)
    };
}; 

export default {  
    updateBalance,
    tradeBitcoin, 
    getBalance
};
