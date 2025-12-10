import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApprovePaymentDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { InvoicingPaymentResponse } from './types';
import { UpdateMultiplePaymentsDto } from './dto/update-multiple-payments-dto';

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

  async approveToWispro(id: string, body: ApprovePaymentDto) {
    const searchPayment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
    });

    const normalized = body.amount.trim().replace(',', '.');

    const parsed = parseFloat(normalized);

    const boddyParsed = {
      ...body,
      amount: parsed,
    };

    if (searchPayment) {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.configService.get<string>('WISPRO_KEY')!,
        },
        body: JSON.stringify(boddyParsed),
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

    throw new HttpException('El ID del pago no existe', HttpStatus.NOT_FOUND);
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
