import express, {Request, Response} from 'express';
import cors from 'cors';
import clientRouter from './routers/client-Router';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/hello", (req:Request, res:Response)=> res.send("Hello!") )
    .use("/cliente", clientRouter)



app.listen(4000, ()=>{
    console.log("It's alive in 4000...")
});