export class Address {
  constructor(
    public id: number,
    public nickname: string,
    public street: string,
    public number: number,
    public neighborhood: string,
    public cep: string,
    public complement: string,
    public addressType: string,
    public streetType: string,
    public residenceType: string,
    public city: string,
    public state: string,
    public country: string,
    public customerId: number,
  ) {}
}
