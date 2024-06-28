import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  sortBy?: 'age' | 'fullName';

  @IsOptional()
  orderBy?: 'ASC' | 'DESC';

  @IsOptional()
  search?: string;
}
