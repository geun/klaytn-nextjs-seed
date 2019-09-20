# Web3 with Nextjs Seed 

## Install it and run:

``` bash
npm install
npm run dev
# or
yarn
yarn dev
```


## Set Environments for develop
```
KLAYTN_PRIVATE_KEY=

FLUI_CARD_CONTRACT_ABI_JSON=
FLUI_CARD_CONTRACT_ADDRESS_JSON=

FLUI_BANK_CONTRACT_ABI_JSON=
FLUI_BANK_CONTRACT_ADDRESS_JSON=

CAVER_PROVIDER=baobab
````

## Set Environments for zeit's now

Create `now.json` and set environments.

```bash

now secrets add default-klaytn-private-key-staging <secret-value>
now secrets add default-klaytn-caver-provider-staging <secret-value>
now secrets add klaytn-seed-klaytn-flui-card-contract-abi-json-staging <secret-value>
now secrets add klaytn-seed-klaytn-flui-card-contract-address-json-staging <secret-value>
now secrets add klaytn-seed-klaytn-flui-bank-contract-abi-json-staging <secret-value>
now secrets add klaytn-seed-klaytn-flui-bank-contract-address-json-staging <secret-value>

```


```json
{
  "env": {
    "KLAYTN_PRIVATE_KEY": "@default-klaytn-private-key-staging",
    "CAVER_PROVIDER": "@default-klaytn-caver-provider-staging",
    "FLUI_CARD_CONTRACT_ABI_JSON": "@klaytn-seed-klaytn-flui-card-contract-abi-json-staging",
    "FLUI_CARD_CONTRACT_ADDRESS_JSON": "@klaytn-seed-klaytn-flui-card-contract-address-json-staging",
    "FLUI_BANK_CONTRACT_ABI_JSON": "@klaytn-seed-klaytn-flui-bank-contract-abi-json-staging",
    "FLUI_BANK_CONTRACT_ADDRESS_JSON": "@klaytn-seed-klaytn-flui-bank-contract-address-json-staging"
  }
}
``` 

## Deploy it to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

```bash
now
```


