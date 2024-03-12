import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/Select.tsx"
import { SelectTrigger } from '@/components/ui/Select.tsx';

export const MyHoldingsFilter = () => {
  return (
    <div className={'mb-8'}>
      <Select defaultValue='all'>
        <SelectTrigger className={"w-[300px] text-foreground border-transparent"}>
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