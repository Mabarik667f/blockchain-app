const abi = [
	{
		"inputs": [
			{
				"internalType": "contract Token",
				"name": "_lp",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addStaking",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStakingData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastReward",
						"type": "uint256"
					}
				],
				"internalType": "struct Staking.StakingItem",
				"name": "",
				"type": "tuple"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakingInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastReward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const stakingAbi = abi;