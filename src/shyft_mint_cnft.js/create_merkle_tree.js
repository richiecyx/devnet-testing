import { signTransaction } from "./sign_transaction.js";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", "ZRemEBaDuXU324B7");

var raw = JSON.stringify({
  network: "devnet",
  wallet_address: "38wEGa7ND1EnYpu7ncEbvdrBFWDa98g4MZKYPKXdepH8",
  max_depth_size_pair: {
    max_depth: 14,
    max_buffer_size: 64,
  },
  canopy_depth: 10,
  fee_payer: "38wEGa7ND1EnYpu7ncEbvdrBFWDa98g4MZKYPKXdepH8",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

// fetch("https://api.shyft.to/sol/v1/nft/compressed/create_tree", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

fetch("https://api.shyft.to/sol/v1/nft/compressed/create_tree", requestOptions)
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
  .catch((error) => {
    console.error("Error:", error);
  });
