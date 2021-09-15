# flagr-feature-react

## Usage

```bash
npm install flagr-feature-react
# or
yarn add flagr-feature-react
```

```tsx
import { useFlagr, FlagrContextProvider } from 'flagr-feature-react';

const SOME_URL = 'flagrUrl';
const APP_TAGS = ['local'];

const MyApp = () => (
  <FlagrContextProvider flagrUrl={SOME_URL} tags={APP_TAGS}>
    <MyComponent />
  </FlagrContextProvider>
);

const MyComponent = () => {
  const { featureIsOn } = useFlagr();

  return featureIsOn('someFeature') ? 'new hotness' : 'old and busted';
};
```

## Installation

\*Until [flagr-feature-typescript](https://github.com/getsidekicker/flagr-feature-typescript) is published, it will need to be locally installed and linked manually before running install

```bash
# In /flagr-feature-typescript/
npm link
# In this project
npm link flagr-feature-typescript --save
npm install
```

## Developing

```bash
npm run dev
```

## Deployment

```bash
npm run build
```
