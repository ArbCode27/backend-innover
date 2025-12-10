import { ApiProperty } from '@nestjs/swagger';
import { UpdatePaymentDto } from './update-payment.dto';
import { IsArray, IsObject, IsString } from 'class-validator';

export class UpdateMultiplePaymentsDto {
  @ApiProperty({ description: 'Array de IDs de los clientes asociados' })
  @IsArray()
  @IsString({ each: true })
  ids: string[];

  @ApiProperty({ description: 'Array de IDs de los clientes asociados' })
  @IsObject()
  data: UpdatePaymentDto;
}
