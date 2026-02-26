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
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/services/authorization/guards/jwt-auth.guard';
import { CreateModelRequestDto } from './dto/create-model-request.dto';
import { ModelResponseDto } from './dto/model-response.dto';
import { UpdateModelRequestDto } from './dto/update-model-request.dto';
import { ModelService } from './model.service';

@ApiTags('Model')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'model', version: '1' })
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Get()
  @ApiOkResponse({ type: ModelResponseDto, isArray: true })
  findAll(): Promise<ModelResponseDto[]> {
    return this.modelService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ type: ModelResponseDto })
  findById(@Param('id') id: string): Promise<ModelResponseDto> {
    return this.modelService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateModelRequestDto })
  @ApiOkResponse({ type: ModelResponseDto })
  create(
    @Body() createModelRequestDto: CreateModelRequestDto,
  ): Promise<ModelResponseDto> {
    return this.modelService.create(createModelRequestDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateModelRequestDto })
  @ApiOkResponse({ type: ModelResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateModelRequestDto: UpdateModelRequestDto,
  ): Promise<ModelResponseDto> {
    return this.modelService.update(id, updateModelRequestDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiNoContentResponse({ description: 'Model deleted successfully' })
  delete(@Param('id') id: string): Promise<void> {
    return this.modelService.delete(id);
  }
}
