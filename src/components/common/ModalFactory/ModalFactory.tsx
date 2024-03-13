import CommonModal from '@/components/widgets/CommonModal/CommonModal.tsx';
import { useModalsContext } from '@/providers/ModalProvider/ModalProvider.tsx';
import { BurnNftModal } from '@/components/features/modals/BurnNftModal/BurnNftModal.tsx';
import { InvestModal } from '@/components/features/modals/InvestModal/InvestModal.tsx';

export const ModalsFactory = () => {
  const { modalName, setModalName } = useModalsContext()

  const handleClose = () => {
    setModalName('')
  };

  const modals = {
    'BURN_NFT': <BurnNftModal/>,
    'INVEST': <InvestModal/>
  };

  return (
    <CommonModal handleClose={handleClose}>
      {modals[modalName as keyof typeof modals] ?? null}
    </CommonModal>
  );
};