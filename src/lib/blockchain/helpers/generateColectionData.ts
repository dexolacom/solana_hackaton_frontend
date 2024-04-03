export const generateColectionData = (type: 'solana' | 'classic', id: number) => {
  if (type === 'solana') {
    return {
      uri: "https://ipfs.io/ipfs/QmQxiv3DwgtvTex6qwoLv7xyrWLcrcFU8NRznhiVzakXur"

    }
  }
  return {
    uri: "https://ipfs.io/ipfs/QmSU9egqywDVxXhdozRUgBf7iAP95ZJJ2stecoA8UsU934"
  }
}