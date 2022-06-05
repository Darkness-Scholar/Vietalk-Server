# VIETALK SERVER

- Git CLONE

- CREATE `root.js` and write down your google cloud apikey, secret, ...

- npm install

## FEATURES

> @ LOGIN

> @ REGISTER

> @ SEND OTP

> @ VERIFY OTP



## TECH

> @ EXPRESS

> @ DB: MONGODB

> @ JSONWEBTOKEN

> @ SOCKET.IO



## API

> [ 1 ] SEND OTP : POST `/api/auth/send-otp` -> object

* Description: Server send OTP to user email, which can be used to login, verify, ...

* Body: `{ email > type:string required }`

* Example: `await axios.post("http:localhost:4444", { email: "tungxm113@gmail.com" })`

> [ 2 ] VERIFY OTP : POST `/api/auth/verify-otp` -> object

* Description: Server rendering and send token to Client, which can be used to login, verify, ...

* Body: { 

    `otp > type:number, require`
    
    `hash > type:string, require`
    
    `email > type:string, require`
    
    `expires > type:string, require`
    
    }

* Example: `await axios.post("http:localhost:4444", { otp: 4421, hash: "XXXXXXXXX", email: "tungxm113@gmail.com" })`

