import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PublicKey } from '@solana/web3.js';
import { useTransferNft } from '@/lib/blockchain/hooks/useTransferNft';
import { useWallet } from '@solana/wallet-adapter-react';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider';
import { addressClassicCollection, classicPotrfolioId, ecosystemPortfolioId } from '@/lib/blockchain/constant';

// TODO: add debounce for amount field

export const useTransferForm = () => {

  const { transfer: transferNft, isLoading } = useTransferNft();
  const { publicKey } = useWallet();
  const { nftTitle, collection } = useModalsContext();
  const nftId = +nftTitle.slice(nftTitle.indexOf('#') + 1);
  const portfolioId = collection === addressClassicCollection ? classicPotrfolioId : ecosystemPortfolioId;

  const FormSchema = z.object({
    address: z.string().refine(value => {
      try {
        if (value === publicKey?.toBase58()) return false
        const pubkey = new PublicKey(value);
        return pubkey.toBase58() === value;
      } catch (error) {
        return false;
      }
    }, {
      message: 'Invalid wallet address',
    })
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // @ts-ignore
      address: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>,) {
    transferNft({
      destinationAddress: new PublicKey(data.address),
      nftId,
      portfolioId
    })
  }
  return { form, onSubmit, isLoading }
}
