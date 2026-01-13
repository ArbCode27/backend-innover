import { IsString, IsUUID, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePaymentPromiseDto {
  @IsDateString()
  @IsNotEmpty()
  valid_until: string;

  @IsUUID()
  @IsNotEmpty()
  contract_id: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  bank: string;

  @IsString()
  @IsNotEmpty()
  transaction_code: string;
}
