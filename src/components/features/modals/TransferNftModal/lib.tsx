import { useEffect } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'
import { PublicKey } from '@solana/web3.js';
import { useTransferNft } from '@/lib/blockchain/hooks/useTransferNft';
import { useWallet } from '@solana/wallet-adapter-react';

// TODO: add debounce for amount field

export const useTransferForm = () => {

  const { transfer: transferNft, isError, isSuccess, isLoading } = useTransferNft();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Info',
        description: 'Operation is successful',
      })
    }
    if (isError) {
      toast({
        title: 'Error',
        description: 'Unsuccessful operation',
      })
    }
  }, [isError, isSuccess])

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
      nftId: 2,
      portfolioId: 3
    })
  }
  return { form, onSubmit, isLoading }
}
