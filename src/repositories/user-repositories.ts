export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Transaction {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  tipo: string;
  usuario_id: number;
  categoria_id: number;
}

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
  abstract findTransactionById(id: number): Promise<any>;
  abstract findManyById(id: number): Promise<any>;
  abstract editing(
    id: number,
    name: string,
    email: string,
    password: string,
  ): Promise<User | null>;
  abstract selectCategories(): Promise<any>;
  abstract transactionAdd(
    descricao: string,
    valor: number,
    data: Date,
    tipo: string,
    usuario_id: number,
    categoria_id: number,
  ): Promise<Transaction | null>;
  abstract transactionEdit(
    id: number,
    descricao: string,
    valor: number,
    data: Date,
    tipo: string,
    categoriaId: number,
  ): Promise<Transaction | null>;
  abstract deleteTransaction(id: number): Promise<void>;
}
