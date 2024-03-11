import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.tsx';
import { ReactNode } from 'react';

interface AssetsCardProps {
  className?: string
  children: ReactNode
}

export const AssetsCard = (props: AssetsCardProps) => {
  const {className, children} = props

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}