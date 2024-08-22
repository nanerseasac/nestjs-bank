import { IsEmail, IsNotEmpty, Length } from "class-validator";



export class createUserBody {
    @IsNotEmpty()
    @Length(5, 50)
    name: string;
    
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Length(5, 20)
    password: string;
}
