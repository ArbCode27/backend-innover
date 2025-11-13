import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID del cliente asociado al pago' })
  @IsString()
  client_id: string;

  @ApiProperty({ description: 'Monto del pago', example: 199.99 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Fecha del pago en formato ISO',
    example: '2025-01-01T12:00:00Z',
  })
  @IsDateString()
  payment_date: string;

  @ApiProperty({ description: 'Comentario opcional del pago', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Código de la transacción',
    example: 'TRX-988123',
  })
  @IsString()
  transaction_code: string;
}
