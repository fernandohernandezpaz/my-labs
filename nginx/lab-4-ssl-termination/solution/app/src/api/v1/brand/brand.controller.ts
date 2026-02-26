import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/services/authorization/guards/jwt-auth.guard';
import { BrandService } from './brand.service';
import { BrandResponseDto } from './dto/brand-response.dto';
import { CreateBrandRequestDto } from './dto/create-brand-request.dto';
import { UpdateBrandRequestDto } from './dto/update-brand-request.dto';
import { TAG_API } from '@/constants/tag-api.constant';
import { RequestUser } from '@/common/decorators/user.decorator';
import { RequestingUser } from '@/common/types/request-user.type';

@ApiTags(TAG_API.brands)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'brand', version: '1' })
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  @Get()
  @ApiOkResponse({ type: BrandResponseDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  findAll(): Promise<BrandResponseDto[]> {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: BrandResponseDto })
  findById(@Param('id') id: string): Promise<BrandResponseDto> {
    return this.brandService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateBrandRequestDto })
  @ApiOkResponse({ type: BrandResponseDto })
  create(
    @RequestUser() user: RequestingUser,
    @Body() createBrandRequestDto: CreateBrandRequestDto,
  ): Promise<BrandResponseDto> {
    return this.brandService.create(createBrandRequestDto, user);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateBrandRequestDto })
  @ApiOkResponse({ type: BrandResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateBrandRequestDto: UpdateBrandRequestDto,
  ): Promise<BrandResponseDto> {
    return this.brandService.update(id, updateBrandRequestDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'Brand deleted successfully' })
  delete(@Param('id') id: string): Promise<void> {
    return this.brandService.delete(id);
  }
}
