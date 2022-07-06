import { Blockchain } from "./blockchain";

const bitcoin = new Blockchain();

bitcoin.createNewTransaction(
  100,
  "ALICE090970FYFFYFYFIF",
  "BOB797789790JFJFFGFJF"
);

function mining(bitcoin: Blockchain) {
  //前のブロックを取得
  const lastBlock = bitcoin.getLastBlock();

  //前のブロックハッシュを取得
  const previousBlockHash = lastBlock["hash"];

  //現在のブロックのデータ
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock["index"] + 1,
  };

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  console.log(nonce);

  const blockHash = bitcoin.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );

  bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
}

mining(bitcoin);

bitcoin.createNewTransaction(
  200,
  "ALICE090970FYFFYFYFIF",
  "BOB797789790JFJFFGFJF"
);

mining(bitcoin);

bitcoin.createNewTransaction(
  300,
  "ALICE090970FYFFYFYFIF",
  "BOB797789790JFJFFGFJF"
);

mining(bitcoin);

console.log(bitcoin);
