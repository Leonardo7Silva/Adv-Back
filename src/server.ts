import express, {Request, Response} from 'express';
import cors from 'cors';
import clientRouter from './routers/cliente-router';
import officeRouter from './routers/escritorio-router';
import signinRouter from './routers/signin-router';
import lawyerRouter from './routers/advogado-router';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/hello", (req:Request, res:Response)=> res.send("Hello!") )
    .use("/cliente", clientRouter)
    .use("/escritorio", officeRouter)
    .use("/signin", signinRouter)
    .use("/advogado", lawyerRouter)



app.listen(4000, ()=>{
    console.log("It's alive in 4000...")
});