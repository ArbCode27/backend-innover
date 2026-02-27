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
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApprovePaymentDto, CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UpdateMultiplePaymentsDto } from './dto/update-multiple-payments-dto';

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
  findAll(@Query('page', ParseIntPipe) page: number) {
    return this.paymentsService.findAll(page);
  }

  @Get('/bcv')
  getBcvRate() {
    return this.paymentsService.getBcvRate();
  }

  @Get(':bank')
  findByBank(@Param('bank') bank: string) {
    return this.paymentsService.findPaymentsByBank(bank);
  }

  @Post('/approve/:id')
  async ApprovePay(
    @Body() approvePaymentDto: ApprovePaymentDto,
    @Param('id') id: string,
  ) {
    const payment = await this.paymentsService.approveToWispro(
      id,
      approvePaymentDto,
    );

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

  @Put()
  updateManyById(@Body() body: UpdateMultiplePaymentsDto) {
    return this.paymentsService.updateManyByIds(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
