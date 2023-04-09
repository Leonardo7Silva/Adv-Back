import officeRepository from "../../repositories/escritorio-repositoy";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Signin } from "../../protocols";
import { invalidSigninError } from "../../errors/invalid-signin-error";


async function signin(params: Signin){

    const {username, password} = params;

    const office = await officeRepository.findUsername(username);
    if(!office){
        throw invalidSigninError();
    };

    const isValidPassword = await bcrypt.compare(password, office.password);
    if(!isValidPassword){
        throw invalidSigninError();
    };

    const token = await createToken(office.id);

    return {
        id:office.id,
        email:office.username,
        token
    };

};

async function createToken(officeId: number): Promise<string> {
    const token = jwt.sign({ officeId }, process.env.JWT_SECRET);
  
    return token;
  };

const signinService ={
    signin
};

export default signinService;