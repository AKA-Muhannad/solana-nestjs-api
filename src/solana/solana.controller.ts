import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SolanaService } from './solana.service';
import { BlockResponse } from '@solana/web3.js';

@ApiTags('Solana')
@Controller('solana')
export class SolanaController {
  constructor(private readonly solanaService: SolanaService) {}
  @ApiOperation({ summary: 'Get block data' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The block data',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  @ApiParam({ name: 'rpcUrl', description: 'RPC URL', type: String })
  @ApiParam({ name: 'block', description: 'Block number', type: Number })
  @Get('block/:rpcUrl/:block')
  async getBlockData(
    @Param('block', ParseIntPipe) block: number,
    @Param('rpcUrl') rpcUrl: string,
  ) {
    try {
      return await this.solanaService.getBlockData(rpcUrl, block);
    } catch (error) {}
  }
}
