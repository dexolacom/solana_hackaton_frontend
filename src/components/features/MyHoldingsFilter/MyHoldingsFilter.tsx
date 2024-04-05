import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/Select.tsx'
import { SelectTrigger } from '@/components/ui/Select.tsx'
import { HoldingsFilterType } from '@/pages/MyHoldingsPage/lib/lib'

interface MyHoldingsFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<HoldingsFilterType>>
}

export const MyHoldingsFilter = ({ setFilter }: MyHoldingsFilterProps) => {
  return (
    <div className={'mb-8'}>
      <Select defaultValue='all' onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className={'w-[300px] text-foreground border-transparent'}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>All portfolios holdings</SelectItem>
            <SelectItem value='classic'>Classic</SelectItem>
            <SelectItem value='ecosystem'>Solana Ecosystem</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
