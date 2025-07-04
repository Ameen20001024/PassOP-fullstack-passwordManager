import dotenv from "dotenv";
import path from "path";


dotenv.config({
    path: path.resolve("./.env")
})

console.log("PORT: ", process.env.PORT)
console.log(process.env.MONGODB_URI)

import connectdb from "./db/index.js";
import {app} from './app.js'

connectdb()
.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at port : 8000`);
    })
    app.on('error', (error)=> {
        console.log("ERROR: ", error)
        throw error
    })
})

.catch((error) => {
    console.log("MONGODB connection failed ", error)
})

// 5.30