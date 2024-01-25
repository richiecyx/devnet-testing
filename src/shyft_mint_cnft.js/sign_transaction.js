import {
  clusterApiUrl,
  Keypair,
  Connection,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";

export async function signTransaction(encodedTransaction) {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "finalized");
    const secretKey = bs58.decode(
      "2kM3wnMcUBe9BsiL7QzGhk7wsaG5NG5ufMneANEJvZgpW7z67GBDhcNhtCMjPX8Q4rBnGnrZXTrzrW3pgEvo118v"
    );
    const feePayer = Keypair.fromSecretKey(secretKey);
    const recoveredTransaction = Transaction.from(
      Buffer.from(encodedTransaction, "base64")
    );
    recoveredTransaction.partialSign(feePayer);
    const txnSignature = await connection.sendRawTransaction(
      recoveredTransaction.serialize()
    );
    return txnSignature;
  } catch (error) {
    console.log(error);
  }
}

// Example usage:
// signTransaction(encodedTransaction).then((signature) => {
//   console.log("Transaction Signature:", signature);
// });
