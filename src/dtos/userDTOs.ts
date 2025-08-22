import { IsEmail, IsInt, IsString, Min, IsArray } from 'class-validator';

export class createUserDTO {
  @IsString()
  name_s!: string;

  @IsString()
  last_name!: string;

  @IsString()
  m_sur_name!: string;
  
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsArray()
  @IsString({ each: true })
  role!: string[];
}

export class editUserDto {
  @IsInt()
  @Min(1)
  id!: number;

  @IsString()
  name_s!: string;

  @IsString()
  last_name!: string;

  @IsString()
  m_sur_name!: string;
  
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsArray()
  @IsString({ each: true })
  role!: string[];
}
