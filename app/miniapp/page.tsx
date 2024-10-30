"use client";

import { contractTransaction, sendTransaction, signTypedData } from "frog/web";
// just to get the abi
import { erc20Abi } from "viem";

export default function MiniAppPage() {
	return (
		<div>
			<h1>Mini-App Example Page</h1>
			<hr />
			<h2>Send Transaction</h2>
			<button
				type="button"
				onClick={async () => {
					const sendTxResponse = await sendTransaction({
						to: "0x0000000000000000000000000000000000000000",
						chainId: "eip155:84532",
						value: 1n,
					});
					console.log("Send Tx Hash", sendTxResponse.transactionHash);
					console.log("Send Tx Address", sendTxResponse.address);
				}}
			>
				Send 1 wei
			</button>
			<hr />
			<h2>Contract Transaction</h2>
			<button
				type="button"
				onClick={async () => {
					const contractTxResponse = await contractTransaction({
						abi: erc20Abi,
						chainId: "eip155:84532",
						to: "0x4200000000000000000000000000000000000006",
						functionName: "approve",
						args: ["0x0000000000000000000000000000000000000000", 1n],
					});
					console.log("Contract Tx Hash", contractTxResponse.transactionHash);
					console.log("Contract Tx Address", contractTxResponse.address);
				}}
			>
				Approve weth to null address
			</button>
			<hr />
			<h2>Sign Typed Data</h2>
			<button
				type="button"
				onClick={async () => {
					const signTypedDataResponse = await signTypedData({
						chainId: "eip155:84532",
						domain: {
							name: "Ether Mail",
							version: "1",
							chainId: 84532,
							verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
						},
						types: {
							Person: [
								{ name: "name", type: "string" },
								{ name: "wallet", type: "address" },
								{ name: "balance", type: "uint256" },
							],
							Mail: [
								{ name: "from", type: "Person" },
								{ name: "to", type: "Person" },
								{ name: "contents", type: "string" },
							],
						},
						primaryType: "Mail",
						message: {
							from: {
								name: "Cow",
								wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
								balance: 0n,
							},
							to: {
								name: "Bob",
								wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
								balance: 1n,
							},
							contents: "Hello, Bob!",
						},
					});

					console.log("Sign Typed Data Address", signTypedDataResponse.address);
					console.log(
						"Sign Typed Data Signature",
						signTypedDataResponse.signature,
					);
				}}
			>
				Sign Typed Data
			</button>
		</div>
	);
}
