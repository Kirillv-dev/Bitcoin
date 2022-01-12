# bitcoin_service
# start app
- `npm install`

### prod
- `npm run start`


### Platform that allows buying or selling of bitcoins.  
### Endpoints: 
1. POST - /users - user sign-up. Body will be: 
{ 
“name”: “Jon A”, 
“username”: “jonjon”, 
“email”: “jon@jmail.com” 
} 
The server will return the user object with 3 additional fields: 
1. id 
2. bitcoinAmount (initial 0) 
3. usdBalance (initial 0) 
4. createdAt 
5. updatedAt 
2. PUT - /bitcoin - updates the bitcoin price (initial value will be 100$). Bitcoin will be saved as the following object: 
{ 
“price”: 100.00, 
“updatedAt” :”2021-01-04T00:12:01.000Z” 
} 
The server will return the current bitcoin object. 
3. GET - /bitcoin - retrieves the current bitcoin object 
4. GET - /users/:id - retrieves a user object (including all the added fields) 
5. PUT - /users/:id - allows a user to change the name or the email of a user, and updates the updatedAt field. Returns a full user object

6. POST - /users/:userId/usd - Allows a user to deposit or withdraw us dollars. Body will be: 
{ 
“action”: “withdraw” or “deposit”, 
“amount”: 40.05 
} 
The server will return the updated user object. 
7. POST - /users/:userId/bitcoins - Allows a user to buy or sell bitcoins. Body will be: 
{ 
“action”: “buy” or “sell”, 
“amount”: 0.05 
} 
The server will return the updated user object 
8. GET - /users/:userId/balance - Retrieves the total balance of the user in usd (amount in usd + amount of bitcoins converted to usd) 
