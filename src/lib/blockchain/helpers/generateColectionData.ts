import { addressClassicCollection } from "../constant"

export const generateColectionData = (addressCollection: string) => {
  if (addressCollection === addressClassicCollection) {
    return {
      uri: "https://ipfs.io/ipfs/QmV3FeU8j8FTBbQgqiMhsGqFJt7WcQ5J17N7oJ15yXk1en"
    }
  }
  return {
    uri: "https://ipfs.io/ipfs/QmWb9hihVBZ3Qi7UjwfBxgKmtNwXCVcPTT9RppRkZ9kjuA"
  }
}