export type ProgramType = {
  "version": "0.1.0",
  "name": "biscuit",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "treasury",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createPortfolio",
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "onchainData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "portfolioId",
          "type": "u8"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "tokens",
          "type": {
            "vec": "publicKey"
          }
        },
        {
          "name": "percentages",
          "type": "bytes"
        },
        {
          "name": "feeIn",
          "type": "u8"
        },
        {
          "name": "feeOut",
          "type": "u8"
        }
      ]
    },
    {
      "name": "buyPortfolio",
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionOnchaindata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftUserTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splAtaProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "portfolioId",
          "type": "u8"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": {
            "vec": "u64"
          }
        },
        {
          "name": "sqrtPriceLimit",
          "type": {
            "vec": "u128"
          }
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": {
            "vec": "bool"
          }
        },
        {
          "name": "aToB",
          "type": {
            "vec": "bool"
          }
        }
      ]
    },
    {
      "name": "burnPortfolio",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionOnchaindata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftUserTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splAtaProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "portfolioData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "biscuitConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "portfolioCollectionData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "percentages",
            "type": "bytes"
          },
          {
            "name": "feeIn",
            "type": "u8"
          },
          {
            "name": "feeOut",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DataLengthMissmatch",
      "msg": "Portfolio data length is missmatch"
    },
    {
      "code": 6001,
      "name": "InvalidPoolForSwap",
      "msg": "Invalid token account for swap"
    },
    {
      "code": 6002,
      "name": "InvalidCollectionMetadata",
      "msg": "Invalid collection metadata"
    },
    {
      "code": 6003,
      "name": "InvalidNFTId",
      "msg": "Invalid NFT id"
    }
  ]
};

export const IDL: ProgramType = {
  "version": "0.1.0",
  "name": "biscuit",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "treasury",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "createPortfolio",
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "onchainData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "portfolioId",
          "type": "u8"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "tokens",
          "type": {
            "vec": "publicKey"
          }
        },
        {
          "name": "percentages",
          "type": "bytes"
        },
        {
          "name": "feeIn",
          "type": "u8"
        },
        {
          "name": "feeOut",
          "type": "u8"
        }
      ]
    },
    {
      "name": "buyPortfolio",
      "accounts": [
        {
          "name": "config",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "treasuryAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMasterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionOnchaindata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftUserTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splAtaProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "whirlpoolProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "portfolioId",
          "type": "u8"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "otherAmountThreshold",
          "type": {
            "vec": "u64"
          }
        },
        {
          "name": "sqrtPriceLimit",
          "type": {
            "vec": "u128"
          }
        },
        {
          "name": "amountSpecifiedIsInput",
          "type": {
            "vec": "bool"
          }
        },
        {
          "name": "aToB",
          "type": {
            "vec": "bool"
          }
        }
      ]
    },
    {
      "name": "burnPortfolio",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionOnchaindata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEditionAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftUserTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mplProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "splAtaProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "portfolioData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "token",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "biscuitConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "adminAuthority",
            "type": "publicKey"
          },
          {
            "name": "minAmount",
            "type": "u64"
          },
          {
            "name": "treasury",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "portfolioCollectionData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "percentages",
            "type": "bytes"
          },
          {
            "name": "feeIn",
            "type": "u8"
          },
          {
            "name": "feeOut",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DataLengthMissmatch",
      "msg": "Portfolio data length is missmatch"
    },
    {
      "code": 6001,
      "name": "InvalidPoolForSwap",
      "msg": "Invalid token account for swap"
    },
    {
      "code": 6002,
      "name": "InvalidCollectionMetadata",
      "msg": "Invalid collection metadata"
    },
    {
      "code": 6003,
      "name": "InvalidNFTId",
      "msg": "Invalid NFT id"
    }
  ]
};
