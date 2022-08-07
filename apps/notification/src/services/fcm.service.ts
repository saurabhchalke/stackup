import FCMToken from "../models/fcmtoken.model";

export const update = async (
  walletAddress: string,
  token: string,
  previousToken?: string
) => {
  return FCMToken.findOneAndUpdate(
    { token: previousToken ?? token },
    { token, walletAddress },
    { upsert: true }
  );
};

export const remove = async (token: string) => {
  console.log(token);
  return FCMToken.deleteOne({ token });
};
