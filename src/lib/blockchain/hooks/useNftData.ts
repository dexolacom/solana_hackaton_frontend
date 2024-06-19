import { useGetNfts } from '@/lib/blockchain/hooks/useGetNfts';
import {
  addressClassicCollection,
  addressEcosystemCollection,
  classicPotrfolioId,
  ecosystemPortfolioId
} from '@/lib/blockchain/constant';
import { useEffect, useState } from 'react';
import { getPortfolio } from '@/lib/api/api';
import { useProjectList } from '@/lib/api/hooks/useProjectList';
import { useQueries } from '@tanstack/react-query';
import { OperationType, decimalsOperations } from '@/lib/helpers/decimalsOperations';

export const useNftData = () => {
  const [cards, setCards] = useState<Record<string, any[]>>();
  const [invested, setInvested] = useState<Record<string, number>>({});
  const { tokens, isLoading: isLoadingTokens } = useGetNfts();

  const { ecosystemProjectId, classicProjectId } = useProjectList();

  const data = useQueries({
    queries: tokens?.map((token) => ({
      queryKey: ['portfolioPrj', token.name],
      queryFn: () =>
        getPortfolio(
          (token.collection.key.toString() === addressClassicCollection ? classicProjectId : ecosystemProjectId) ?? '',
          +token?.name?.replace('BiscuitPortfolio', '')?.trim()
        ),
      staleTime: Infinity
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data?.data),
        pending: results.some((result) => result.isPending)
      };
    }
  });

  useEffect(() => {
    if (data && !data.pending) {
      const newNftData = tokens

        ?.map((item) => ({
          ...item,
          content: {
            ...data?.data?.find(
              (element) =>
                element?.project.collectionId ===
                  (item?.collection.key.toString() === addressClassicCollection
                    ? classicPotrfolioId
                    : ecosystemPortfolioId) &&
                element.portfolioId === +item?.name?.replace('BiscuitPortfolio', '')?.trim()
            )
          }
        }))
        .sort((a, b) => +a?.name?.replace(/\D/g, '') - +b?.name?.replace(/\D/g, ''));

      const invested = decimalsOperations(
        data?.data.reduce((accumulator, item) => {
          return accumulator + (item?.amount ?? 0);
        }, 0),
        1e6,
        OperationType.DIV
      );

      const classicInvested = decimalsOperations(
        newNftData
          .filter((element) => element?.collection.key.toString() === addressClassicCollection)
          .reduce((accumulator, item) => accumulator + (item?.content?.amount ?? 0), 0),
        1e6,
        OperationType.DIV
      );

      const ecosystemInvested = decimalsOperations(
        newNftData
          .filter((element) => element?.collection.key.toString() === addressEcosystemCollection)
          .reduce((accumulator, item) => accumulator + (item?.content?.amount ?? 0), 0),
        1e6,
        OperationType.DIV
      );

      const classicCards = newNftData.filter(
        (element) => element?.collection.key.toString() === addressClassicCollection
      );
      const ecosystemCards = newNftData.filter(
        (element) => element?.collection.key.toString() === addressEcosystemCollection
      );
      setCards({
        all: newNftData,
        classic: classicCards,
        ecosystem: ecosystemCards
      });

      setInvested({
        all: invested ?? 0,
        classic: classicInvested ?? 0,
        ecosystem: ecosystemInvested ?? 0
      });
    }
  }, [data]);

  const isLoading = isLoadingTokens || data.pending;

  return { cards, isLoading, invested };
};
