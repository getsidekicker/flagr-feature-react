# flagr-feature-react

[![image](https://img.shields.io/npm/v/flagr-feature-react?color=CC3534&logo=npm)](https://www.npmjs.com/package/flagr-feature-react)

## Usage

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

  return featureIsOn?.('someFeature') ? 'new hotness' : 'old and busted';
};
```

## Installation

Requires npm 7

```bash
npm install
```

## Development

```bash
npm run dev
```

## Deployment

```bash
npm run build
```
