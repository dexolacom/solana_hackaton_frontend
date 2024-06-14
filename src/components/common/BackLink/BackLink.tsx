import { ChevronLeft } from 'lucide-react';
import { AppLink } from '@/components/common/AppLink/AppLink.tsx';

interface BackLinkProps {
  title: string;
  path: string;
}

export const BackLink = (props: BackLinkProps) => {
  const { path, title } = props;

  return (
    <AppLink to={path} variant={'ghost'} className={'font-raleway text-base font-medium mb-8 gap-2 normal-case p-0 mt-6'}>
      <ChevronLeft className='h-5 w-5 mt-[2px]' />
      {title}
    </AppLink>
  );
};
