import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/Select"
import { SelectTrigger } from '@/components/ui/Select.tsx';

export const MyHoldingsFilter = () => {
  return (
    <div className={'mb-8'}>
      <Select>
        <SelectTrigger className="w-[300px] text-foreground">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All portfolios holdings</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="classicEarn">Classic + earn</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}