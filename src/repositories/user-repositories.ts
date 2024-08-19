export abstract class UserRepository {
    abstract create(name: string, email: string, password: string): Promise<void>
    abstract findByEmail(email: string): Promise<any>
}

