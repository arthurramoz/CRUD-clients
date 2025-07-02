export class CreditCard {
  constructor(
    public id: number,
    public number: string,
    public cardholder: string,
    public cvv: string,
    public expirationDate: string,
    public cardBrand: string,
    public preferential: boolean,
    public customerId: number,
  ) {}
}
