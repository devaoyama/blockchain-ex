import sha256 from "sha256";

export class Blockchain {
  public chain: any[];
  public pendingTransactions: any[];

  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(100, "0", "0");
  }

  createNewBlock(nonce: number, previousBlockHash: string, hash: string) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transaction: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  createNewTransaction(amount: number, sender: string, recipient: string) {
    const newTransaction = {
      amount,
      sender,
      recipient,
    };

    this.pendingTransactions.push(newTransaction);
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  hashBlock(previousBlockHash: string, currentBlockData: any, nonce: number) {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
  }

  proofOfWork(previousBlockHash: string, currentBlockData: any) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  }
}
