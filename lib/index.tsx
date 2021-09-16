import React, { createContext, useContext, useEffect, useState } from 'react';
import { createEvaluator, FlagCallbacks } from 'flagr-feature-typescript';

type FlagrContextType = {
  evaluate?: <T>(flag: string, callbacks: FlagCallbacks<T>) => T;
  match?: (flag: string, matchVariant?: string) => boolean;
};

const FlagrContext = createContext<FlagrContextType>({});

export const useFlagr = useContext(FlagrContext);

interface FlagrContextProviderProps {
  children: React.ReactNode;
  flagrUrl: string;
  tags: [string, ...string[]];
}

export const FlagrContextProvider = ({
  children,
  flagrUrl,
  tags,
}: FlagrContextProviderProps) => {
  const [value, setValue] = useState<FlagrContextType>({});

  useEffect(() => {
    (async () => {
      const { batchEvaluation } = createEvaluator({
        flagrUrl,
      });

      const { cachedEvaluate, cachedMatch } = await batchEvaluation({
        context: {},
        input: {
          tags,
        },
      });

      setValue({
        evaluate: cachedEvaluate,
        match: cachedMatch,
      });
    })();
  }, []);

  return (
    <FlagrContext.Provider value={value}>{children}</FlagrContext.Provider>
  );
};
