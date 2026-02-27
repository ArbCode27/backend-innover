import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApprovePaymentDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { InvoicingPaymentResponse } from './types';
import { UpdateMultiplePaymentsDto } from './dto/update-multiple-payments-dto';
import { HttpService } from '@nestjs/axios';

const url = 'https://www.cloud.wispro.co/api/v1/invoicing/payments/';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private readonly httpService: HttpService,
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

  findAll(page: number) {
    const skip = (page - 1) * 20;
    return this.prisma.payment.findMany({
      take: 20,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findPaymentsByBank(bank: string) {
    return this.prisma.payment.findMany({
      where: {
        bank: bank,
        status: 'EN_PROCESO',
      },
    });
  }

  async getBcvRate(): Promise<number> {
    const req = await fetch(
      'https://api.dolarvzla.com/public/bcv/exchange-rate',
      {
        headers: {
          'x-dolarvzla-key':
            '15c41eb41e70c1ebe27808902872e8ac17a83a4f819bb7b4160a63521609768b',
        },
      },
    );

    if (!req.ok) {
      throw new HttpException(
        'Error fetching BCV rate',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const raw: unknown = await req.json();

    if (typeof raw !== 'object' || raw === null) {
      throw new HttpException('Invalid BCV response', HttpStatus.BAD_REQUEST);
    }

    const data = raw as Record<string, unknown>;
    const current = data.current as Record<string, unknown>;

    if (!current || typeof current.usd !== 'number') {
      throw new HttpException('Invalid BCV structure', HttpStatus.BAD_REQUEST);
    }

    return current.usd;
  }

  async approveToWispro(id: string, body: ApprovePaymentDto) {
    const searchPayment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!searchPayment) {
      throw new HttpException('El ID del pago no existe', HttpStatus.NOT_FOUND);
    }

    const normalized = body.amount.trim().replace(',', '.');
    const parsed = parseFloat(normalized);

    if (isNaN(parsed)) {
      throw new HttpException('Monto inválido', HttpStatus.BAD_REQUEST);
    }

    // 🚀 SIN "as"
    //
    const bcvRate = await this.getBcvRate();

    if (!bcvRate) {
      throw new HttpException('Monto inválido', HttpStatus.BAD_REQUEST);
    }

    const ammountCalculate = parsed / bcvRate;

    const bodyParsed = {
      ...body,
      amount: ammountCalculate,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.configService.get<string>('WISPRO_KEY')!,
      },
      body: JSON.stringify(bodyParsed),
    });

    const payment = (await res.json()) as InvoicingPaymentResponse;

    if (payment.errors) {
      throw new HttpException(payment.errors, HttpStatus.BAD_REQUEST);
    }

    await this.prisma.payment.update({
      where: { id },
      data: { status: 'APROBADO' },
    });

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

  async updateManyByIds(body: UpdateMultiplePaymentsDto) {
    try {
      const payments = await this.prisma.payment.updateMany({
        where: { id: { in: body.ids } },
        data: body.data,
      });
      return payments;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error';

      throw new HttpException(
        message.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  remove(id: string) {
    return this.prisma.payment.delete({ where: { id } });
  }
}
