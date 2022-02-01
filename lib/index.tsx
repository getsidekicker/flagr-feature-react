import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createEvaluator,
  FlagCallbacks,
  FlagVariant,
  JsonObject,
} from 'flagr-feature-typescript';

export type FlagrContextType = {
  evaluate?: <T>(flag: string, callbacks: FlagCallbacks<T>) => T;
  match?: (flag: string, matchVariant?: string) => boolean;
  variant?: (flag: string) => FlagVariant;
  loaded: boolean;
};

const FlagrContext = createContext<FlagrContextType>({ loaded: false });

export const useFlagr = () => useContext(FlagrContext);

export interface FlagrContextProviderProps {
  children: React.ReactNode;
  flagrUrl: string;
  tags: [string, ...string[]];
  id?: string;
  context?: JsonObject;
}

export const FlagrContextProvider = ({
  children,
  flagrUrl,
  tags,
  id,
  context = {},
}: FlagrContextProviderProps) => {
  const [value, setValue] = useState<FlagrContextType>({ loaded: false });

  useEffect(() => {
    (async () => {
      const Evaluator = createEvaluator({
        flagrUrl,
      });

      const { cachedEvaluate, cachedMatch, cachedVariant } =
        await Evaluator.batchEvaluation({
          id,
          context,
          input: {
            tags,
          },
        });

      setValue({
        evaluate: cachedEvaluate,
        match: cachedMatch,
        variant: cachedVariant,
        loaded: true,
      });
    })();
  }, []);

  return (
    <FlagrContext.Provider value={value}>{children}</FlagrContext.Provider>
  );
};
