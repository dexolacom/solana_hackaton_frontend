import CommonModal from '@/components/widgets/CommonModal/CommonModal.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { BurnNftModal } from '@/components/feature/BurnNftModal/BurnNftModal.tsx';

export const ModalsFactory = () => {
  const { modalName, setModalName } = useModalsContext()

  const handleClose = () => {
    setModalName('')
  };

  const modals = {
    'BURN_NFT': <BurnNftModal/>
  };

  return (
    <CommonModal handleClose={handleClose}>
      {modals[modalName as keyof typeof modals] ?? null}
    </CommonModal>
  );
};