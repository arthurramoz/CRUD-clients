export interface CustomerResponse {
  id: number;
  codigo: string;
  name: string;
  birth_date: Date;
  cpf: string;
  gender: string;
  email: string;
  password: string;
  status: boolean;
  ranking: number;
  created_at: Date;
}
