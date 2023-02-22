# DAOhaus: V3 Vite Starter

## Development

### 1. project setup

```bash
git clone git@github.com:HausDAO/moloch-v3-vite-starter.git

cd moloch-v3-vite-starter

yarn
```

### 2. env setup

```bash
cp .env.sample .env
```

```md
VITE_RIVET_KEY

get a free rivet key [here](https://rivet.cloud/)

VITE_EXPLORER_KEY

get etherscan explorer api key [here](https://etherscan.io/apis)

VITE_GRAPH_API_KEY_MAINNET

if deeveloping for mainnet or gnosis chain you can get an api key [here](https://thegraph.com/explorer/subgraph?id=GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP&view=Overview). Ignore this one if not worried about mainnet or gnosis chain yet.

VITE_TARGET_KEY

This will be the target address for your DAO you are developing the app for.
```

### 3. target dao set up

[Summon a DAO here](https://summon.daohaus.club)

Edit src/targetDao.ts

- add your DAO's data
- Put the dao address in the .env variable mentioned above VITE_TARGET_KEY
- You can add multiple DAOs as new object in targetDao.ts and toggle with this env variable
- You can add otehr variables to targetDao.ts as needed

### 4. run the development server

```bash
yarn dev
```

## Reference

### main.tsx

- sets up the react query provider @daohaus/moloch-v3-hooks will use
- sets up DHConnectProvider - that handles the wallet connect functionality
- sets up HausThemeProvider - that provides the styling theme to the app
- adds the router to the app

### HomeContainer.tsx

- Parent component wrapping all routes/pages
- sets up DHLayout which adds the connect button and navigation to the app
  - you can change nav links here
- sets up TXBuilder which will enable easy transaction creation

### FormTest.tsx

- Example of how to add FormBuilder to the app
- see the lego it is using at `legos/forms.ts`, `legos/fields.ts` and `legos/tx.ts`
  - these are recipes to create forms and contract function interactions

### todo

- add routes/pages for dao overview, vaults, settings
  - proposals, members and profile coming soon
- show hook data fetch
- show macro ui addition
- moloch-v3-fields package
  - coming soon

### adding ui components

- storybook

### adding custom fields

tbd

### editing the theme

tbd

### router example for multi-dao app

tbd

### more docs
