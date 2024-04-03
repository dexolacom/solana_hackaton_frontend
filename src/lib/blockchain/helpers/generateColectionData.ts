export const generateColectionData = (type: 'solana' | 'classic', id: number) => {
  if (type === 'solana') {
    return {
      title: `Solana Ecosystem#${id}`,
      symbol: "SLT",
      uri: "https://ipfs.io/ipfs/QmQxiv3DwgtvTex6qwoLv7xyrWLcrcFU8NRznhiVzakXur"

    }
  }
  return {
    title: `Classic#${id}`,
    symbol: "CLC",
    uri: "https://ipfs.io/ipfs/QmSU9egqywDVxXhdozRUgBf7iAP95ZJJ2stecoA8UsU934"
  }
}