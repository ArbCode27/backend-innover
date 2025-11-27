import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApprovePaymentDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const payment = this.paymentsService.create(createPaymentDto);
      return payment;
    } catch (err) {
      throw new HttpException(
        err as Record<string, string>,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Post('/approve')
  async ApprovePay(@Body() approvePaymentDto: ApprovePaymentDto) {
    const payment =
      await this.paymentsService.approveToWispro(approvePaymentDto);
    if (payment.errors) {
      throw new HttpException(payment.errors, HttpStatus.BAD_REQUEST);
    }
    return payment;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
