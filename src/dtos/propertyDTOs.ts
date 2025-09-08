import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsInt,
  IsUrl,
  IsEnum,
  Min,
  Max,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  // @IsEnum(['sale', 'rent', 'both'])
  @IsEnum(['sale', 'rent'])
  transaction_type!: string;

  // @IsEnum(['available', 'sold', 'rented'])
  @IsEnum(['available', 'unavailable'])
  status!: string;

  @IsEnum(['USD', 'MXN'])
  currency!: string;

  @IsNumber()
  sale_price!: number;

  @IsNumber()
  rent_price!: number;

  @IsNumber()
  deposit!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  commission_rate!: number;

  @IsString()
  province!: string;

  @IsString()
  sector!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsBoolean()
  has_parking!: boolean;

  @IsInt()
  parking_spaces!: number;

  @IsBoolean()
  is_furnished!: boolean;

  @IsOptional()
  @IsUrl()
  video_url?: string;

  @IsOptional()
  @IsUrl()
  virtual_tour_url?: string;

  @IsInt()
  agent_id!: number;

  @IsInt()
  broker_id!: number;

  @IsInt()
  created_by!: number;

  @IsString()
  property_type!: string;
}

export class EditPropertyDto extends CreatePropertyDto {
  @IsInt()
  @Min(1)
  id!: number;
}
