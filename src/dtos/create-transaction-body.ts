import { IsDate, IsDateString, isDateString, IsNotEmpty, IsNumber, Length } from "class-validator";


export class createTransactionBody {
    @Length(5,20)
    @IsNotEmpty()
    descricao: string


    @IsNumber()
    @IsNotEmpty()
    valor: number

    @IsNotEmpty()
    tipo: string


    @IsDateString()
    @IsNotEmpty()
    data: Date

    @IsNotEmpty()
    categoriaId: number

}