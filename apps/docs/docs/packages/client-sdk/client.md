---
sidebar_position: 2
---

# Client

A connection to an ERC-4337 client node.

An instance of a `ERC4337ClientRpc` is an abstraction to support the following RPC methods as outlined in the EIP:

1. `eth_sendUserOperation`
2. `eth_supportedEntryPoints`

---

## Interfaces

This interface is built using [`UserOperation`](./useroperation.md#useroperation-1), [`UserOperationBuilder`](./useroperation.md#useroperationbuilder), and [`BigNumberish`](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish) from [ethers.js](https://docs.ethers.io/).

### ERC4337ClientRpc

An instance of `ERC4337ClientRpc` exposes methods to help get your `UserOperation` to an ERC-4337 client.

```typescript
interface ERC4337ClientRpc {
  // URL string to ERC-4337 client node.
  url: string;

  // Chain ID of the EVM network ops are intended for.
  // See https://chainlist.org
  chainId: BigNumberish;

  sendUserOperation: (
    opts: SendUserOperationOpts,
    id?: number
  ) => Promise<JSONRpcResponse<SendUserOperationResult>>;

  supportedEntryPoints: (
    id?: number
  ) => Promise<JSONRpcResponse<SupportedEntryPointsResult>>;
}

interface SendUserOperationOpts {
  builder?: UserOperationBuilder;
  op?: UserOperation;
  entryPoint?: string;
}

interface JSONRpcResponse<T> {
  id: number;
  result: T;
}

interface JSONRpcError {
  code: number;
  message: string;
}

type SendUserOperationResult = boolean | undefined;

type SupportedEntryPointsResult = Array<string>;
```

---

## Initialize

One instance should be initialized for each node and network your application supports.

```js
const client = new ERC4337ClientRpc(url, chainId);
```

---

## sendUserOperation

A helper function for calling `eth_sendUserOperation`. The optional `id` argument is for the RPC request and defaults to `1`.

If a [`builder`](./useroperation.md#useroperationbuilder) is passed into `opts`, it will use the `buildOp` method to construct the `UserOperation`. If both `builder` and `op` is passed, the `builder` will take precedence.

If an `entryPoint` is not passed into `opts`, it will use the preferred address from `supportedEntryPoints`.

```js
const { id, result } = await client.sendUserOperation(opts, id);
```

---

## supportedEntryPoints

A helper function for calling `eth_supportedEntryPoints`. The optional `id` argument is for the RPC request and defaults to `1`.

The result is an array of `EntryPoint` addresses supported by the client. The first element is the client's preferred `EntryPoint`.

```js
const { id, result } = await client.supportedEntryPoints(id);
```

---

## JSONRpcError

In the event of a failed RPC request the `client` will throw a `JSONRpcError`. This `error` object will have the following schema as outlined by the [JSON-RPC spec](https://www.jsonrpc.org/specification#error_object).

Client specific `codes` and `messages` may also be used which aren't defined in the standard.
