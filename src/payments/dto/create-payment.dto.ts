import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum Status {
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
  EN_PROCESO = 'EN_PROCESO',
}

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID del cliente asociado al pago' })
  @IsString()
  client_id: string;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Monto del pago', example: 199.99 })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Banco desde donde se realizó el pago',
    example: 'Banco Venezuela',
  })
  @IsString()
  bank: string;

  @ApiProperty({
    description: 'Fecha del pago en formato ISO',
    example: '2025-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  payment_date?: Date;

  @ApiProperty({
    description: 'Comentario opcional del pago',
    required: false,
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({
    description: 'Código de la transacción',
    example: 'TRX-988123',
  })
  @IsString()
  transaction_code: string;

  @ApiProperty({
    description: 'Estado del pago',
    enum: Status,
  })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
