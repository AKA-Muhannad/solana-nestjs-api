import { Injectable, Logger } from '@nestjs/common';
import { Connection, GetVersionedBlockConfig } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  private logger = new Logger('SolanaService');
  getConnection(rpcUrl: string): Connection {
    return new Connection(rpcUrl, 'confirmed');
  }
  async getLastBlock(rpcUrl: string) {
    try {
      const connection = this.getConnection(rpcUrl);
      const lastBlock = await connection.getSlot();
      this.logger.log(`connection ${JSON.stringify(connection)}`);
      this.logger.log(`lastBlock ${JSON.stringify(lastBlock)}`);
      return lastBlock;
    } catch (error) {
      throw new Error(`[SolanaService] getLastBlock \n ${error.message}`);
    }
  }
  async getBlockData(rpcUrl: string, blockNumber: number) {
    try {
      const connection = this.getConnection(rpcUrl);
      const config: GetVersionedBlockConfig = {
        maxSupportedTransactionVersion: 0,
      };
      /**
       * TODO: To be checked the below with block variable
       * Deprecated symbol used, consult docs for better alternative
       * TS6387: The signature
       * (slot: number, rawConfig?: GetBlockConfig): Promise<BlockResponse>
       * of connection.getBlock is deprecated.
       * index. d. ts(3450, 8): The declaration was marked as deprecated here.
       * **/
      const block = await connection.getParsedBlock(blockNumber, config);
      this.logger.log(`connection ${JSON.stringify(connection)}`);
      this.logger.log(`block ${JSON.stringify(block)}`);
      return block;
    } catch (error) {
      throw new Error(
        `${error.message} for getBlockData from shared soloana service`,
      );
    }
  }
}
