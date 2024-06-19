import { useMutation } from '@tanstack/react-query';
import { setFaucet } from '../api';
import { useToast } from '@/lib/hooks/useToast';

export const useFaucet = () => {
  const { toast } = useToast();

  const {
    mutate: airDrop,
    isError,
    isSuccess,
    isPending: isLoading
  } = useMutation({
    mutationFn: setFaucet,
    onSuccess: (data) => {
      toast({
        title: 'Info',
        description: `${data.data.amount} USDC has been successfully sent to your wallet.`
      });
    },
    onError: (error) => {
      console.log(error);
      error instanceof Error
        ? toast({
            title: 'Error',
            description: error.message
          })
        : toast({
            title: 'Error',
            description: 'Unsuccessful operation'
          });
    }
  });

  return { airDrop, isError, isSuccess, isLoading };
};
