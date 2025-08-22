import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CrearPersonaDto {
  @IsString()
  nombre!: string;

  @IsInt()
  @Min(0)
  edad!: number;

  @IsEmail()
  correo!: string;
}

export class editPersonDto {
  @IsInt()
  id!: number;
  @IsString()
  nombre!: string;

  @IsInt()
  @Min(0)
  edad!: number;

  @IsEmail()
  correo!: string;
}
