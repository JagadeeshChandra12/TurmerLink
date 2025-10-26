import CryptoJS from 'crypto-js';

/**
 * Lightweight blockchain simulation for transaction verification
 * Creates hash-based ledger entries for tamper-proof storage
 */

export class BlockchainLedger {
  constructor() {
    this.chain = [];
    this.difficulty = 2; // Simple proof of work
  }

  /**
   * Create a new block with transaction data
   */
  createBlock(transactionData, previousHash = '') {
    const block = {
      index: this.chain.length,
      timestamp: new Date().toISOString(),
      data: transactionData,
      previousHash: previousHash,
      nonce: 0,
      hash: ''
    };

    // Simple proof of work
    block.hash = this.calculateHash(block);
    while (!block.hash.startsWith('0'.repeat(this.difficulty))) {
      block.nonce++;
      block.hash = this.calculateHash(block);
    }

    return block;
  }

  /**
   * Calculate hash for a block
   */
  calculateHash(block) {
    const dataString = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      data: block.data,
      previousHash: block.previousHash,
      nonce: block.nonce
    });
    return CryptoJS.SHA256(dataString).toString();
  }

  /**
   * Add a new transaction to the ledger
   */
  addTransaction(transactionData) {
    const previousHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '';
    const newBlock = this.createBlock(transactionData, previousHash);
    this.chain.push(newBlock);
    return newBlock;
  }

  /**
   * Verify the integrity of the blockchain
   */
  verifyChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if current block's previous hash matches previous block's hash
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      // Check if current block's hash is valid
      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get transaction by hash
   */
  getTransactionByHash(hash) {
    return this.chain.find(block => block.hash === hash);
  }

  /**
   * Get all transactions for a farmer
   */
  getFarmerTransactions(farmerId) {
    return this.chain
      .filter(block => block.data.farmerId === farmerId)
      .map(block => ({
        hash: block.hash,
        timestamp: block.timestamp,
        ...block.data
      }));
  }

  /**
   * Generate a transaction hash for verification
   */
  generateTransactionHash(transactionData) {
    const dataString = JSON.stringify({
      farmerId: transactionData.farmerId,
      saleDate: transactionData.saleDate,
      quantity: transactionData.quantity,
      price: transactionData.price,
      buyer: transactionData.buyer,
      timestamp: new Date().toISOString()
    });
    return CryptoJS.SHA256(dataString).toString();
  }
}

// Create a singleton instance
export const ledger = new BlockchainLedger();
