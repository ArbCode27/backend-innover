import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty()
  id: string;

  @ApiProperty()
  public_id: number;

  @ApiProperty({ nullable: true })
  custom_id: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ nullable: true })
  password: string | null;

  @ApiProperty({ nullable: true })
  phone: string | null;

  @ApiProperty({ nullable: true })
  phone_mobile: string | null;

  @ApiProperty()
  phone_mobile_verified: boolean;

  @ApiProperty()
  address: string;

  @ApiProperty()
  kind_person: string;

  @ApiProperty()
  national_identification_number: string;

  @ApiProperty({ nullable: true })
  details: string | null;

  @ApiProperty()
  collector_id: string;

  @ApiProperty()
  seller_id: string;

  @ApiProperty()
  neighborhood_id: string;

  @ApiProperty()
  zone_name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  link_mobile_login: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty({ nullable: true })
  street: string | null;

  @ApiProperty({ nullable: true })
  number: string | null;

  constructor(partial: Partial<Customer>) {
    Object.assign(this, partial);
  }
}
