import { Matches, IsString, IsNotEmpty, IsNumber, IsPositive, IsDefined } from "class-validator";

export class signUpDto {  
    @IsString() 
    @IsNotEmpty() 
    @IsDefined()
    name: string; 
    @IsString() 
    @IsNotEmpty() 
    @IsDefined()
    username: string;
    @IsNotEmpty() 
    @IsDefined()
    @Matches(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    email: String;
}

export class updateBitcoinPriceDto {  
    @IsNotEmpty() 
    @IsDefined() 
    @IsNumber() 
    @IsPositive()
    price: number;
};  

export class updateUserDto {  
    @IsNotEmpty()  
    @IsDefined()
    @IsString()
    name?: string; 
    @IsNotEmpty() 
    @IsString()
    email?: string;
};  

export class tradeDto { 
    @IsNotEmpty()  
    @IsDefined()
    @IsString()
    action: string; 
    @IsNotEmpty()  
    @IsDefined()
    @IsNumber() 
    @IsPositive()
    amount: number;
};  

export class getBalanceDto {  
    @IsDefined()
    @IsNotEmpty() 
    @IsString()
    userId: string;
}; 