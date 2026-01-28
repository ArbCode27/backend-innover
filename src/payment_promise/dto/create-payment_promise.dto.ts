import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreatePaymentPromiseDto {
  @ApiProperty({
    description: 'dias que desea pagar el cliente',
    example: '20',
  })
  @IsString()
  @IsNotEmpty()
  valid_until: string;

  @ApiProperty({ description: 'id del contrato', example: '13123-d1212-dsfs1' })
  @IsUUID()
  @IsNotEmpty()
  contract_id: string;

  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Pérez' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'monto pagado', example: '200.00' })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    description: 'banco al que se realizo la transferencia',
    example: 'Venezuela',
  })
  @IsString()
  @IsNotEmpty()
  bank: string;

  @ApiProperty({
    description: 'Codigo de referencia bancaria',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  transaction_code: string;
}
