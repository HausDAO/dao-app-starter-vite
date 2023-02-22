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

### editing the theme

tbd

### router example for multi-dao app

tbd
