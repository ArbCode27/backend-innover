import { Injectable } from '@nestjs/common';
import { CreatePaymentPromiseDto } from './dto/create-payment_promise.dto';
import { UpdatePaymentPromiseDto } from './dto/update-payment_promise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentPromiseService {
  constructor(private prisma: PrismaService) {}

  create(createPaymentPromiseDto: CreatePaymentPromiseDto) {
    try {
      const payment = this.prisma.payment_promise.create({
        data: {
          ...createPaymentPromiseDto,
        },
      });
      return payment;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.prisma.payment_promise.findMany();
  }

  findOne(id: string) {
    return this.prisma.payment_promise.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updatePaymentPromiseDto: UpdatePaymentPromiseDto) {
    return this.prisma.payment_promise.update({
      where: {
        id: id,
      },
      data: {
        ...updatePaymentPromiseDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.payment_promise.delete({
      where: {
        id: id,
      },
    });
  }
}
