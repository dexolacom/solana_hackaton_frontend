import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { ClassicPageTable } from '@/components/tables/ClassicPageTable/ClassicPageTable.tsx';

interface AssetsCardProps {
  className?: string
}

export const AssetsCard = (props: AssetsCardProps) => {
  const { className } = props

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ClassicPageTable/>
      </CardContent>
    </Card>
  )
}