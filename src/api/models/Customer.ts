export class Customer {
  constructor(
    public id: number,
    public codigo: string,
    public name: string,
    public birth_date: Date,
    public cpf: string,
    public gender: string,
    public email: string,
    public password: string,
    public status: boolean,
    public ranking: number,
    public created_at: Date,
  ) {}
}
