import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SolanaService } from './solana.service';

@ApiTags('Solana')
@Controller('solana')
export class SolanaController {
  private logger = new Logger('SolanaController');

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
    this.logger.debug(`@Get @Param block ${block}`);
    this.logger.debug(`@Get @Param rpcUrl ${rpcUrl}`);
    try {
      const blockData = await this.solanaService.getBlockData(rpcUrl, block);
      this.logger.debug(`blockData ${JSON.stringify(blockData)}`);
      return block;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({ summary: 'Get current block' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current block number',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  @ApiParam({ name: 'rpcUrl', description: 'RPC URL', type: String })
  @Get('last-block/:rpcUrl')
  async getCurrentBlock(@Param('rpcUrl') rpcUrl: string) {
    this.logger.debug(`@Param rpcUrl ${rpcUrl} `);
    try {
      const currentBlock = await this.solanaService.getLastBlock(rpcUrl);
      this.logger.debug(`${JSON.stringify(currentBlock)}`);
      return currentBlock;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
