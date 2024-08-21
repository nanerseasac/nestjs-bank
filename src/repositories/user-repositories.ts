export abstract class UserRepository {
    abstract create(name: string, email: string, password: string): Promise<void>
    abstract findByEmail(email: string): Promise<any>
    abstract editing(id: number, name: string, email: string, password: string): Promise<any>
    abstract selectCategories(): Promise<any>
    abstract transactionAdd(descricao: string, valor: number, data: Date, tipo: string, usuarioId: number, categoriaId: number): Promise<any>
}

