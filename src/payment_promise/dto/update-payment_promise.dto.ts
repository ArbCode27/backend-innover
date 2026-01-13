import { PartialType } from '@nestjs/swagger';
import { CreatePaymentPromiseDto } from './create-payment_promise.dto';

export class UpdatePaymentPromiseDto extends PartialType(CreatePaymentPromiseDto) {}
