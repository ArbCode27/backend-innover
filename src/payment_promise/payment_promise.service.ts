import { Injectable } from '@nestjs/common';
import { CreatePaymentPromiseDto } from './dto/create-payment_promise.dto';
import { UpdatePaymentPromiseDto } from './dto/update-payment_promise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentPromiseService {
  constructor(private prisma: PrismaService) {}

  create(createPaymentPromiseDto: CreatePaymentPromiseDto) {
    try {
      const valid = this.addCalendarDays(
        Number(createPaymentPromiseDto.valid_until),
      );
      const payment = this.prisma.paymentPromise.create({
        data: {
          ...createPaymentPromiseDto,
          valid_until: valid.toISOString(),
        },
      });
      return payment;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.prisma.paymentPromise.findMany();
  }

  findOne(id: string) {
    return this.prisma.paymentPromise.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updatePaymentPromiseDto: UpdatePaymentPromiseDto) {
    return this.prisma.paymentPromise.update({
      where: {
        id: id,
      },
      data: {
        ...updatePaymentPromiseDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.paymentPromise.delete({
      where: {
        id: id,
      },
    });
  }

  addCalendarDays(days: number): Date {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }
}
