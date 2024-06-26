import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/Select.tsx';
import { SetURLSearchParams } from 'react-router-dom';
import { SelectTrigger } from '@/components/ui/Select.tsx';
import { HoldingsFilterType } from '@/pages/MyHoldingsPage/lib/lib';

interface MyHoldingsFilterProps {
  setFilter: SetURLSearchParams;
}

export const MyHoldingsFilter = ({ setFilter }: MyHoldingsFilterProps) => {
  return (
    <div className={'mb-8'}>
      <Select defaultValue='all' onValueChange={(value: HoldingsFilterType) => setFilter({ filter: value })}>
        <SelectTrigger
          className={`w-[300px] text-foreground border-transparent h-6 rounded-none bg-transparent uppercase 
            px-0 font-bold text-xl mt-10 hover:border-none focus:border-none data-[state=open]:border-none`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className='uppercase'>
            <SelectItem value='all'>All portfolios holdings</SelectItem>
            <SelectItem value='classic'>Classic Portfolio</SelectItem>
            <SelectItem value='ecosystem'>Solana Ecosystem</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
