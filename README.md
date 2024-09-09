# Solana NestJS API

This project is a NestJS-based API that interacts with the Solana blockchain. It provides endpoints to fetch block data and get the current block number from the Solana network.

## Features

- Fetch data for a specific block on the Solana blockchain
- Get the current (latest) block number
- Swagger UI for easy API documentation and testing

## Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn
- Basic understanding of NestJS and Solana blockchain

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/solana-nestjs-api.git
   cd solana-nestjs-api
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory and add the following:

```
PORT=3000
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

Adjust the `SOLANA_RPC_URL` as needed for your desired Solana network (mainnet, testnet, or devnet).

## Running the Application

1. Start the application in development mode:
   ```
   npm run start:dev
   ```
   or with yarn:
   ```
   yarn start:dev
   ```

2. The API will be available at `http://localhost:3000`
3. Swagger UI documentation will be available at `http://localhost:3000/api`

## API Endpoints

- `GET /solana/block/:rpcUrl/:block` - Fetch data for a specific block
- `GET /solana/last-block/:rpcUrl` - Get the current block number

For detailed information about the endpoints and their parameters, please refer to the Swagger UI documentation.
