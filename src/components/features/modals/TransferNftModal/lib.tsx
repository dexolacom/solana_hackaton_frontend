import { useEffect } from 'react';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/lib/hooks/useToast.ts'
import { PublicKey } from '@solana/web3.js';
import { useTransferNft } from '@/lib/blockchain/hooks/useTransferNft';

// TODO: add debounce for amount field

export const useTransferForm = (mint: string) => {

  const { transferNft, isError, isSuccess } = useTransferNft();

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
      console.log("🚀 ~ address:z.string ~ value:", value)
      try {
        const pubkey = new PublicKey(value);
        console.log("🚀 ~ address:z.string ~ pubkey:", pubkey)
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

  async function onSubmit(data: z.infer<typeof FormSchema>,) {
    await transferNft({
      destinationAddress: new PublicKey(data.address),
      mintPubkey: new PublicKey(mint)
    })
  }
  return { form, onSubmit }
}
