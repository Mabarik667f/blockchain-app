const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "contract Token",
				"name": "_first",
				"type": "address"
			},
			{
				"internalType": "contract Token",
				"name": "_second",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount2",
				"type": "uint256"
			},
			{
				"internalType": "contract Token",
				"name": "_lp",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "contract Token",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "calculatedAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "first",
		"outputs": [
			{
				"internalType": "contract Token",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPoolData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "contract Token",
						"name": "first",
						"type": "address"
					},
					{
						"internalType": "contract Token",
						"name": "second",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ratio",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "firstETH",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "secondETH",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "firstTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "secondTokens",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "supporters",
						"type": "address[]"
					}
				],
				"internalType": "struct Pool.PoolItem",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSupporters",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lp",
		"outputs": [
			{
				"internalType": "contract Token",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pool",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "contract Token",
				"name": "first",
				"type": "address"
			},
			{
				"internalType": "contract Token",
				"name": "second",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ratio",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "firstETH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "secondETH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "firstTokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "secondTokens",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "second",
		"outputs": [
			{
				"internalType": "contract Token",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setRatio",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract Token",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "supportPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract Token",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "swapTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const poolAbi = abi;