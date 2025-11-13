import { ApiProperty } from '@nestjs/swagger';

export class Payment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  client_id: string;

  @ApiProperty({ example: 150.75 })
  amount: number;

  @ApiProperty({ example: '2025-01-01T12:00:00Z' })
  payment_date: Date;

  @ApiProperty({ required: false })
  comment?: string;

  @ApiProperty({ example: 'TRX-123456' })
  transaction_code: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<Payment>) {
    Object.assign(this, partial);
  }
}
