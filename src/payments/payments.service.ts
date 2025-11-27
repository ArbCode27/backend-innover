import { Injectable } from '@nestjs/common';
import { ApprovePaymentDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { InvoicingPaymentResponse } from './types';

const url = 'https://www.cloud.wispro.co/api/v1/invoicing/payments/';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = this.prisma.payment.create({
        data: {
          ...createPaymentDto,
        },
      });
      return payment;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.prisma.payment.findMany();
  }

  async approveToWispro(body: ApprovePaymentDto) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.configService.get<string>('WISPRO_KEY')!, // o "x-api-key": API_KEY según la API
      },
      body: JSON.stringify(body),
    });
    const payment = (await res.json()) as InvoicingPaymentResponse;

    return payment;
  }

  findOne(id: string) {
    return this.prisma.payment.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  remove(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
