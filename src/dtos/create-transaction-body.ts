import {
  IsIn,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  Max,
  Min,
} from 'class-validator';

export type entradaOrSaida = 'entrada' | 'saida';

export class createTransactionBody {
  @Length(5, 20)
  @IsNotEmpty()
  descricao: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsIn(['entrada', 'saida'])
  tipo: entradaOrSaida;

  @IsDateString()
  @IsNotEmpty()
  data: Date;

  @IsNumber()
  @Min(1)
  @Max(17)
  @IsNotEmpty()
  categoriaId: number;
}
