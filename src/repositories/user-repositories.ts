export abstract class UserRepository {
    abstract create(name: string, email: string, password: string): Promise<void>
    abstract findByEmail(email: string): Promise<any>
    abstract findById(id: number): Promise<any>
    abstract findTransactionById(id: number): Promise<any>
    abstract findManyById(id: number): Promise<any>
    abstract editing(id: number, name: string, email: string, password: string): Promise<any>
    abstract selectCategories(): Promise<any>
    abstract transactionAdd(descricao: string, valor: number, data: Date, tipo: string, usuarioId: number, categoriaId: number): Promise<any>
    abstract transactionEdit(id: number,descricao: string, valor: number, data: Date, tipo: string, categoriaId: number): Promise<any>
    abstract deleteTransaction(id: number): Promise<void>
}

