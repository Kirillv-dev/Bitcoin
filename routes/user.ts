import { Request, Response } from "express";   
import Logger from "../core/logger";  
import User from "../core/user/index";    
import userService from "../services/user";   

export const signUp = (req: Request, res: Response) => {
    try {      
        Logger.info(JSON.stringify(req.body), __filename, 'signUp');
        const { name, username, email } = req.body;  
        const result = User.signUp(name, username, email);
        res.send(result);
    } catch (e) {
        res.send(e.message) 
        Logger.error(e.message, __filename, 'signUp');
    };
};

export const getUser =  (req: Request, res: Response) => {
    try {   
        Logger.info(JSON.stringify(req.params), __filename, 'getUser');
        const { id } = req.params;    
        const result = User.getUser(id);
        res.send(result);
    } catch (e) {  
      Logger.error(e.message, __filename, 'getUser'); 
      const err = e.message.split('/');  
      res.status(err[1]).send(err[2])
    }
};

export const updateUser = (req: Request, res: Response) => {
    try { 
        Logger.info(JSON.stringify(req.body), __filename, 'updateUser');
        const { name, email } = req.body;   
        const { id } = req.params; 
        const result = User.updateUser(id, name, email);
        res.send(result);
    } catch (e) {
        Logger.error(e.message, __filename, 'updateUser'); 
        const err = e.message.split('/');  
        res.status(err[1]).send(err[2])
    };
};

export const updateBalance = (req: Request, res: Response) => {
    try { 
        Logger.info(JSON.stringify(req.body), __filename, 'updateBalance');
        const { action, amount } = req.body;    
        const { userId } = req.params;
        const result = userService.updateBalance(userId, action, amount);
        res.send(result);
    } catch (e) {
        Logger.error(e.message, __filename, 'updateBalance' ); 
        const err = e.message.split('/');  
        res.status(err[1]).send(err[2])
    };
}; 

export const tradeBitcoin = (req: Request, res: Response) => {
    try {
        Logger.info(JSON.stringify(req.body), __filename, 'tradeBitcoin');
        const { action, amount } = req.body;  
        const { userId } = req.params;
        const result = userService.tradeBitcoin(userId, action, amount);
        res.send(result);
    } catch (e) {
        Logger.error(e.message, __filename, 'tradeBitcoin'); 
        const err = e.message.split('/');  
        res.status(err[1]).send(err[2])
    }
};

export const getBalance = (req: Request, res: Response) => {
    try { 
        Logger.info(JSON.stringify(req.params), __filename, 'getBalance');
        const { userId } = req.params;   
        const result = userService.getBalance(userId);
        res.send(result);
    } catch (e) {  
        Logger.error(e.message, __filename, 'getBalance'); 
        const err = e.message.split('/');  
        res.status(err[1]).send(err[2])
    };
};
