import { signTransaction } from "./sign_transaction.js";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "ZRemEBaDuXU324B7");

var raw = JSON.stringify({
  network: "devnet",
  creator_wallet: "38wEGa7ND1EnYpu7ncEbvdrBFWDa98g4MZKYPKXdepH8",
  metadata_uri:
    "https://gateway.pinata.cloud/ipfs/QmYmUb5MHZwYovnQg9qANTJUi7R8VaE5CetfssczaSWn5K",
  merkle_tree: "Fr9gQFvPRJzRZYrAKPuf6Y2FisnGiURnqkZNcoqZ4qqn",
  is_delegate_authority: true,
  max_supply: 5,
  primary_sale_happend: true,
  is_mutable: true,
  receiver: "38wEGa7ND1EnYpu7ncEbvdrBFWDa98g4MZKYPKXdepH8",
  fee_payer: "38wEGa7ND1EnYpu7ncEbvdrBFWDa98g4MZKYPKXdepH8",
  priority_fee: 100,
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("https://api.shyft.to/sol/v1/nft/compressed/mint", requestOptions)
  .then((response) => {
    // Check if the response status is OK (status code between 200 and 299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response body as JSON
    return response.json();
  })
  .then((result) => {
    // Now 'result' contains the parsed JSON data
    console.log(result);
    signTransaction(result.result.encoded_transaction).then((signature) => {
      console.log("Transaction Signature:", signature);
    });
    // console.log(result.result.encoded_transaction);
  })
  .catch((error) => console.log("error", error));
