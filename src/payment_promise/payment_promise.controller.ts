import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentPromiseService } from './payment_promise.service';
import { CreatePaymentPromiseDto } from './dto/create-payment_promise.dto';
import { UpdatePaymentPromiseDto } from './dto/update-payment_promise.dto';

@Controller('payment-promise')
export class PaymentPromiseController {
  constructor(private readonly paymentPromiseService: PaymentPromiseService) {}

  @Post()
  create(@Body() createPaymentPromiseDto: CreatePaymentPromiseDto) {
    return this.paymentPromiseService.create(createPaymentPromiseDto);
  }

  @Get()
  findAll() {
    return this.paymentPromiseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentPromiseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentPromiseDto: UpdatePaymentPromiseDto) {
    return this.paymentPromiseService.update(+id, updatePaymentPromiseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentPromiseService.remove(+id);
  }
}
