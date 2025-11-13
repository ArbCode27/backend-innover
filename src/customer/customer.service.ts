import { Injectable } from '@nestjs/common';
import { Customer } from './types';
import { ConfigService } from '@nestjs/config';

const url = 'https://www.cloud.wispro.co/api/v1/clients';

@Injectable()
export class CustomerService {
  constructor(private configService: ConfigService) {}

  findOne(dni: string) {
    const getClientByDni = async (dni: string): Promise<Customer> => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: this.configService.get<string>('WISPRO_KEY')!,
        },
      };

      const res = await fetch(
        `${url}?national_identification_number_eq=${dni}`,
        options,
      );
      if (!res.ok) throw new Error('Error al obtener los datos');
      const customer = (await res.json()) as { data: Customer };
      return customer.data;
    };
    const client = getClientByDni(dni);
    return client;
  }

  findAll() {
    return `This action returns a customer`;
  }
}
