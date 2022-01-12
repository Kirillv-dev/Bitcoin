import { IUser } from './../../interfaces/User'; 
const uuid = require('uuid') ;  

let users:IUser[] = [];  

const selectUser = (id:string) => users.find(user => user.id === id); 

const deleteUser = (id:string) => users = users.filter(user => user.id !== id);
const addUser = (updatedUser:IUser) => users.push(updatedUser) 

const signUp = (name:string, username:string, email:string) => {
    try {     
        const userId = uuid.v4();
        const date:string = new Date().toISOString();
        const user:IUser = {
            id: userId,
            name,
            username,
            email,
            bitcoinAmount: 0,
            usdBalance: 0,
            createdAt: date,
            updatedAt: date
        };
        users.push(user); 
        return user;
    } catch (e) {
        throw Error(e.message)
    };
};

const getUser = (id:string) => {
    try {      
        const foundUser:IUser = selectUser(id);  
        if(!foundUser){  
            throw Error("/404/This user doesn't exist")
        };  
       return foundUser;
    } catch (e) {
        throw Error(e)
    };
};

const updateUser = (id:string, name:string, email:string) => {
    try { 
        let foundUser:IUser = selectUser(id);  
         if (!foundUser){ 
            throw Error("/404/This user doesn't exist")
        };  
        const date = new Date().toISOString(); 

        const updatedUser:IUser =  {  
            ...foundUser,
            name: name? name : foundUser.name,
            email: email? email : foundUser.email,
            updatedAt: date
        };   

        users = users.filter(user => user.id !== id); 
        users.push(updatedUser); 

       return updatedUser; 
    } catch (e) {
       throw Error(e)
    };
}; 

export default { 
    selectUser, 
    deleteUser,
    addUser, 
    signUp, 
    getUser, 
    updateUser 
};