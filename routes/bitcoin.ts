import { Request, Response } from "express";   
import Logger from "../core/logger";   
import bitcoinService from "../services/bitcoin"; 

export const updateBitcoinPrice = (req: Request, res: Response) => {
    try {   
        Logger.info(JSON.stringify(req.body), __filename, 'updateBitcoinPrice');
        const { price } = req.body;   
        const result = bitcoinService.updateBitcoinPrice(price);
        res.send(result);
    } catch (e) { 
        Logger.error(e.message, __filename, 'updateBitcoinPrice'); 
        res.send(e.message) 
    };
};

export const getBitcoin = (req: Request, res: Response) => {
    try { 
        const result = bitcoinService.getBitcoin();
        res.send(result);
    } catch (e) {  
        Logger.error(e.message, __filename, 'updateBitcoinPrice'); 
        res.send(e.message) 
    };
};