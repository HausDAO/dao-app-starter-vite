# DAO MiniApp Starter (vite)

Vite React Starter for a DAO app scoped to a single DAO.

## Development

### 1. Project Setup

#### SSH

```bash
git clone git@github.com:HausDAO/moloch-v3-vite-starter.git

cd dh-moloch-v3-vite-starter

yarn
```

#### HTTPS

```bash
git clone https://github.com/HausDAO/dh-v3-vite-starter.git

cd dh-moloch-v3-vite-starter

yarn
```

### 2. `.env` Setup

```bash
cp .env.sample .env
```

```yaml
VITE_RIVET_KEY
```

Get a free Rivet key [here](https://rivet.cloud/)

```yaml
VITE_EXPLORER_KEY
```

Get an Etherscan API key [here](https://etherscan.io/apis)

```yaml
VITE_GRAPH_API_KEY_MAINNET
```

If developing for Mainnet or Gnosis Chain you can get an API key [here](https://thegraph.com/explorer/subgraph?id=GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP&view=Overview). Ignore this one if not worried about mainnet or gnosis chain yet.

```yaml
VITE_TARGET_KEY
```

This is the target address for the DAO you are developing the app for. You will get this value in the next step if you do not have an existing DAO.

### 3. Target DAO Set-up

[Summon](https://summon.daohaus.club) a DAO

#### Edit `src/targetDao.ts`

Add your DAO's data to the property and values of the object

#### Edit `.env`

Add the DAO address in the `VITE_TARGET_KEY` variable

- You can add multiple DAOs as new objects in `targetDao.ts` and toggle with this `env` variable
- You can add other variables to `targetDao.ts` as needed

### 4. Run the Development Server

```bash
yarn dev
```

## Reference

### `main.tsx`

- Sets up the `react-query` provider `@daohaus/moloch-v3-hooks` will use
- Sets up `DHConnectProvider` - that handles the Wallet Connect functionality
- Sets up `HausThemeProvider` - that provides the styling theme to the app
- Adds the router to the app

### `HomeContainer.tsx`

- Parent component wrapping all routes/pages
- Sets up `DHLayout` which adds the connect button and navigation to the app
  - You can update the navigation in `navLinks`
- Sets up `TXBuilder` which enables easy transaction creation

### `FormTest.tsx`

- Example of how to add `FormBuilder` to the app
- See the legos it is using at `legos/forms.ts`, `legos/fields.ts`, and `legos/tx.ts`
  - These are recipes for creating forms and contract function interactions

### ToDo

- Ad routes/pages for dao overview, vaults, settings
  - proposals, members and profile coming soon
- show hook data fetch
- show macro ui addition
- `moloch-v3-fields` package
  - coming soon

### Adding UI Components

- [Storybook](https://storybook.js.org/)

### Methods for Accessing `daoid` and `daochain`

These values are used in most hooks and components and you have some options:

Get them from `targetDao.ts`

```tsx
const daoChain = TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID;
const daoId = TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS;
```

or load them into a context from the `@daohaus/moloch-v3-hooks` library and then there is a hook you can use.

Wrap your tree in this context:

```tsx
import { CurrentDaoProvider } from "@daohaus/moloch-v3-hooks";

...

<CurrentDaoProvider
  targetDao={{
    daoChain: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID,
    daoId: TARGET_DAO[import.meta.env.VITE_TARGET_KEY].ADDRESS,
  }}
>
  {children}
</CurrentDaoProvider>;
```

Then access this hook:

```tsx
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
 ...

const { daoChain, daoId } = useCurrentDao();
```

- Future: `urlParams` in a multi DAO app

### Adding Custom Fields

tbd

### Editing the Theme

tbd

### Router Example for Multi DAO App

tbd

## Resources

- [DAO Toolbox](https://toolbox.daohaus.fun/) docs
- HausDAO monorepo [libs](https://github.com/HausDAO/monorepo/tree/develop/libs)
- monorepo admin/admin-new
