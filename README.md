# flagr-feature-react

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
