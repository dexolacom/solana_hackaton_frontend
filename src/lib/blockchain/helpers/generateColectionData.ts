import { addressClassicCollection } from '../constant';

export const generateColectionData = (addressCollection: string) => {
  if (addressCollection === addressClassicCollection) {
    return {
      uri: 'https://ipfs.io/ipfs/QmQRYkZxFQWcLXXsbMtvQ5gAaoPMX3bpnbQb1dGzMJ8ELF'
    };
  }
  return {
    uri: 'https://ipfs.io/ipfs/QmRSGF5pY56kPSRrDQ2LoLajMpSbNZ5Lb5huuKKhfhSqp9'
  };
};
