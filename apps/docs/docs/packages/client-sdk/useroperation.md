---
sidebar_position: 3
---

# UserOperation

A class for building ERC-4337 transaction objects.

A [`UserOperation`](../../introduction/erc-4337-overview.md#useroperation) is a pseudo-transaction object used to execute actions through a smart contract wallet. Although it can be quite complex to create, the `UserOperationBuilder` simplifies this process using the [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern). The interface is also agnostic to any ERC-4337 wallet implementation.

---

## Interfaces

These interfaces are built using common [ethers.js](https://docs.ethers.io/) types. More specifically [`BigNumberish`](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish) and [`BytesLike`](https://docs.ethers.io/v5/api/utils/bytes/#BytesLike).

### UserOperation

An interface for an ERC-4337 transaction object. Building a `UserOperation` involves constructing multiple parts and merging them together.

```typescript
interface UserOperation {
  sender: string;
  nonce: BigNumberish;
  initCode: BytesLike;
  callData: BytesLike;
  callGas: BigNumberish;
  verificationGas: BigNumberish;
  preVerificationGas: BigNumberish;
  maxFeePerGas: BigNumberish;
  maxPriorityFeePerGas: BigNumberish;
  paymaster: string;
  paymasterData: BytesLike;
  signature: BytesLike;
}
```

### UserOperationBuilder

An instance of `UserOperationBuilder` can help build a `UserOperation` that can be passed to the [`client`](./client.md#senduseroperation).

```typescript
interface UserOperationBuilder {
  // `get` methods for specific fields.
  getSender: () => string;
  getNonce: () => BigNumberish;
  getInitCode: () => BytesLike;
  getCallData: () => BytesLike;
  getCallGas: () => BigNumberish;
  getVerificationGas: () => BigNumberish;
  getPreVerificationGas: () => BigNumberish;
  getMaxFeePerGas: () => BigNumberish;
  getMaxPriorityFeePerGas: () => BigNumberish;
  getPaymaster: () => string;
  getPaymasterData: () => BytesLike;
  getSignature: () => BytesLike;

  // `set` methods allow fields to be set directly.
  setSender: (address: string) => UserOperationBuilder;
  setNonce: (nonce: BigNumberish) => UserOperationBuilder;
  setInitCode: (code: BytesLike) => UserOperationBuilder;
  setCallData: (data: BytesLike) => UserOperationBuilder;
  setCallGas: (gas: BigNumberish) => UserOperationBuilder;
  setVerificationGas: (gas: BigNumberish) => UserOperationBuilder;
  setPreVerificationGas: (gas: BigNumberish) => UserOperationBuilder;
  setMaxFeePerGas: (fee: BigNumberish) => UserOperationBuilder;
  setMaxPriorityFeePerGas: (fee: BigNumberish) => UserOperationBuilder;
  setPaymaster: (address: string) => UserOperationBuilder;
  setPaymasterData: (data: BytesLike) => UserOperationBuilder;
  setSignature: (bytes: BytesLike) => UserOperationBuilder;

  // Some fields may require arbitrary logic to build an op.
  // Middleware functions allow you to set custom logic for building op fragments.
  useMiddleware: (fn: UserOperationMiddlewareFn) => UserOperationBuilder;
  resetMiddleware: () => void;

  // This will construct a UserOperation that can be sent to a client.
  buildOp: (
    entryPoint: string,
    chainId: BigNumberish
  ) => Promise<UserOperation>;

  // Will reset all fields back to default value.
  resetOp: () => void;
}

type UserOperationMiddlewareFn = (
  context: UserOperationMiddlewareCtx
) => Promise<Partial<UserOperation>>;

interface UserOperationMiddlewareCtx {
  op: UserOperation;
  entryPoint: string;
  chainId: BigNumberish;

  // A `requestId` is a unique hash of op + entryPoint + chainId.
  getRequestId: () => Promise<string>;
}
```

---

## Initialize

The simplest way to use this package is to pass a configured builder to a client.

```js
const builder = new UserOperationBuilder();

// Configure the builder and then pass to a client when ready to be sent.
// The client will build, send, and reset the UserOperation.
const result = await client.sendUserOperation({ builder });
```

---

## `get` and `set` Functions

These are basic getters and setters for all fields on a `UserOperation`. Getters return the field type whereas setters will return the instance to enable chaining.

For example:

```typescript
const builder = new UserOperationBuilder()
  .setSender(walletAddress)
  .setInitCode(walletInitCode);
```

## Middleware Functions

Some fragments on a `UserOperation` may depend on custom logic in order to be built. For example, based on your `Wallet` implementation there might be a specific way to fetch the `nonce` and sign an operation which aren't specified in the standard.

For such cases we can set custom middleware functions. During `buildOp`, a middleware will be called in the order they are set. Here is a example of middleware functions you might have in your application:

```typescript
const fetchNonce = (provider) => async (ctx) => {
  // Fetch nonce from smart contract wallet on-chain.
  return { nonce };
};

const fetchGasEstimate = async (ctx) => {
  // Fetch gas estimate from provides like Blocknative.
  return { maxFeePerGas, maxPriorityFeePerGas };
};

const getPaymasterApproval = async (ctx) => {
  // Fetch paymaster data.
  return { paymaster, paymasterData };
};

const signUserOperation = async (ctx) => {
  // Use the required signature scheme based on your wallet.
  // ctx.getRequestId() will generate the required hash for verification.
  // Multisig, ECDSA, etc.
  return { signature };
};

const builder = new UserOperationBuilder()
  .useMiddleware(fetchNonce(provider))
  .useMiddleware(fetchGasEstimate)
  .useMiddleware(getPaymasterApproval)
  .useMiddleware(signUserOperation);
```
