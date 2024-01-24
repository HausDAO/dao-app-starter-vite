# DAO MiniApp Starter (vite)

Vite React Starter for a DAO app scoped to a single DAO.

## Development

### 1. Project Setup

#### NPX/degit

```bash
npx degit HausDAO/dao-app-starter-vite my-daohaus-app

cd my-daohaus-app

git init

yarn
```

#### SSH

```bash
git clone git@github.com:HausDAO/moloch-v3-vite-starter.git

git remote remove origin

cd dh-moloch-v3-vite-starter

yarn
```

#### HTTPS

```bash
git clone https://github.com/HausDAO/dh-v3-vite-starter.git

git remote remove origin

cd dh-moloch-v3-vite-starter

yarn
```

### 2. `.env` Setup

```bash
cp .env.sample .env
```

Rivet is the default RPC - Get a free Rivet key [here](https://rivet.cloud/)

```yaml
VITE_RIVET_KEY
```

You can also use any RPC url

```yaml
VITE_MAINNET_RPC=
VITE_GOERLI_RPC=
VITE_GNOSISCHAIN_RPC=
VITE_OPTIMISM_RPC=
VITE_POLYGONPOS_RPC=
VITE_ARBITRUM_RPC=
VITE_SEPOLIA_RPC=
VITE_BASE_RPC=
```


You can also use Alchemy API keys for Optimism, Arbitrum, Base or Polygon

```yaml
VITE_OPTIMISM_ALCHEMY_KEY
VITE_ARBITRUM_ALCHEMY_KEY
VITE_POLYGONPOS_ALCHEMY_KEY
VITE_BASE_ALCHEMY_KEY
```

Proposal details uses etherscan explorer APIs to fetch ABIs. Add a key for any chain you are supporting. Get an Etherscan API key [here](https://etherscan.io/apis)

```yaml
VITE_ETHERSCAN_KEY
VITE_ARBISCAN_KEY
VITE_GNOSISSCAN_KEY
VITE_POLYGONSCAN_KEY
VITE_OPTIMISMSCAN_KEY
VITE_BASESCAN_KEY
```

If developing for Mainnet or Gnosis Chain you can get an API key [here](https://thegraph.com/explorer/subgraph?id=GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP&view=Overview). Ignore this one if not worried about mainnet or gnosis chain yet.

```yaml
VITE_GRAPH_API_KEY_MAINNET
```

This is the target address for the DAO you are developing the app for. You will get this value in the next step if you do not have an existing DAO. You'll need to use this if you are setting the app up for single DAO. More on this below.

```yaml
VITE_TARGET_KEY
```

### 3. Single DAO vs. Multi-DAO Setup

#### If your app is supporting a single DAO

[Summon](https://summon.daohaus.club) a DAO

##### Edit `src/targetDao.ts`

Add your DAO's data to the property and values of the object

##### Edit `.env`

Add the DAO address in the `VITE_TARGET_KEY` variable

- You can add multiple DAOs as new objects in `targetDao.ts` and toggle with this `env` variable
- You can add other variables to `targetDao.ts` as needed

#### If your app is supporting multiple DAOs

Remove VITE_TARGET_KEY from the .env file.

You will now beable to navigate to any existing dao whenrunning the app with the following url pattern:

`/#/molochv3/:daochain/:daoid`

This is the same pattern seen in the [DAOhaus admin app](https://admin.daohaus.club/#/molochv3/0x5/0xf6538c07324f59b3ba685d86393c65dce9676c70)

##### `:daochain` is the network ID for the DAO

'0x1' - mainnet
'0x5' - goerli
'0x64' - gnosis chain
'0x89' - polygon
'0xa' - optimism
'0xa4b1' - arbitrum

##### `:daoid` is the contract address for the DAO smart contract

### 4. Run the Development Server

```bash
yarn dev
```

## Reference

### `main.tsx`

- Sets up the `react-query` provider `@daohaus/moloch-v3-hooks` will use
- Sets up `HausThemeProvider` - that provides the styling theme to the app

### `App.tsx`

- Sets up `DHConnectProvider` - that handles the Wallet Connect functionality
- Adds the router to the app

### `HomeContainer.tsx`

- Parent component wrapping all on-dao scoped routes/pages
- Sets up `DHLayout` which adds the connect button and navigation to the app
  - You can update the navigation in `navLinks`
-

### `DaoContainer.tsx`

- Parent component wrapping all dao scoped routes/pages
- Sets up `DHLayout` which adds the connect button and navigation to the app
  - You can update the navigation in `navLinks`
- Sets up `TXBuilder` which enables easy transaction creation

### `FormTest.tsx`

- Example of how to add `FormBuilder` to the app
- See the legos it is using at `legos/forms.ts`, `legos/fields.ts`, and `legos/tx.ts`
  - These are recipes for creating forms and contract function interactions

### Pages/

- Example of many current DAO Admin pages
  - Dao overview
  - Proposal list and Proposal details
  - Member list and Member details
  - Dao Settings

### Adding UI Components

- [Storybook](https://storybook.js.org/)

### Methods for Accessing `daoid` and `daochain`

These values are used in most hooks and components and are loaded into a context from the `@daohaus/moloch-v3-hooks` library and then there is a hook you can use.

```tsx
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
 ...

const { daoChain, daoId } = useCurrentDao();
```

### Adding Custom Fields

tbd

### Editing the Theme

tbd

## Resources

- [DAO Toolbox](https://toolbox.daohaus.fun/) docs
- HausDAO monorepo [libs](https://github.com/HausDAO/monorepo/tree/develop/libs)
- monorepo apps/admin
