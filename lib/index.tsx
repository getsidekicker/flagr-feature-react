import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createEvaluator,
  FlagCallbacks,
  JsonObject,
} from 'flagr-feature-typescript';

type FlagrContextType = {
  evaluate?: <T>(flag: string, callbacks: FlagCallbacks<T>) => T;
  match?: (flag: string, matchVariant?: string) => boolean;
  evaluating: boolean;
};

const FlagrContext = createContext<FlagrContextType>({ evaluating: true });

export const useFlagr = () => useContext(FlagrContext);

interface FlagrContextProviderProps {
  children: React.ReactNode;
  flagrUrl: string;
  tags: [string, ...string[]];
  context?: JsonObject;
}

export const FlagrContextProvider = ({
  children,
  flagrUrl,
  tags,
  context = {},
}: FlagrContextProviderProps) => {
  const [value, setValue] = useState<FlagrContextType>({ evaluating: true });

  useEffect(() => {
    (async () => {
      const Evaluator = createEvaluator({
        flagrUrl,
      });

      const { cachedEvaluate, cachedMatch } = await Evaluator.batchEvaluation({
        context,
        input: {
          tags,
        },
      });

      setValue({
        evaluate: cachedEvaluate,
        match: cachedMatch,
        evaluating: false,
      });
    })();
  }, []);

  return (
    <FlagrContext.Provider value={value}>{children}</FlagrContext.Provider>
  );
};
