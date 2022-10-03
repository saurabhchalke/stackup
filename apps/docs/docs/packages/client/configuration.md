---
sidebar_position: 2
---

# Configuration

Options to configure a standalone RPC client.

The client can be configured either through a `.bundlerrc.json` file or using environment variables.

## JSON options

```json
{
  // Port to run the Client on.
  "port": 3000,

  // Connection string to a standard Ethereum node.
  "rpcUrl": "",

  // Array of EntryPoint addresses to support.
  // The first address is the preferred EntryPoint.
  // TODO: Add default address.
  "supportedEntryPoints": [],

  // A path to the file containing the mnemonic.
  // This will be the EOA used to relay bundles to the EntryPoint.
  // Make sure NOT to commit the file to version control.
  "mnemonicPath": ".mnemonic",

  // Address to send gas refunds for relaying bundlers.
  // Will use the first account of the mnemonic by default.
  "beneficiary": ""
}
```

## Environment variables

```bash
STACKUP_BUNDLER_PORT=3000

STACKUP_BUNDLER_RPC_URL=

STACKUP_BUNDLER_SUPPORTED_ENTRY_POINTS=

STACKUP_BUNDLER_MNEMONIC_PATH=

STACKUP_BUNDLER_BENEFICIARY=
```
