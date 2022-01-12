import { signUpDto, updateBitcoinPriceDto, tradeDto, updateUserDto } from './dto';
import { Router } from "express"; 
import * as user from './routes/user';
import * as bitcoin from './routes/bitcoin';
import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

const router = Router();

const validator = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToClass(dtoClass, req.body);
        validate(output, { skipMissingProperties: true }).then(errors => {
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send(errorTexts);
                return;
            } else {
                res.locals.input = output;
                next();
            }
        });
    };
};

router.post('/users', validator(signUpDto), user.signUp); 
router.put('/bitcoin', validator(updateBitcoinPriceDto), bitcoin.updateBitcoinPrice); 
router.get('/bitcoin', bitcoin.getBitcoin); 
router.get('/users/:id', user.getUser); 
router.put('/users/:id', validator(updateUserDto), user.updateUser); 
router.post('/users/:userId/usd', validator(tradeDto), user.updateBalance);
router.post('/users/:userId/bitcoins', validator(tradeDto), user.tradeBitcoin); 
router.get('/users/:userId/balance', user.getBalance);  

module.exports = router;