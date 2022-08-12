import ActivityWebhook, {
  IActivityWebhook,
} from "../models/activitywebhook.model";
import { ValidNetworks } from "../config";

export const MAX_ADDRESS_PER_WEBHOOK = 50000;

export const getMissingWebhookForNetworks = async (walletAddress: string) => {
  const activityWebhooks = await ActivityWebhook.find({
    walletAddress,
    network: { $in: ValidNetworks },
  });

  const networkSet = new Set(
    activityWebhooks.map((activityWebhook) => activityWebhook.network)
  );
  return ValidNetworks.filter((network) => !networkSet.has(network));
};

export const saveWebhooks = async (
  activityWebhooks: Array<IActivityWebhook>
) => {
  return ActivityWebhook.insertMany(activityWebhooks);
};

export const getByWebhookId = async (alchemyWebhookId: string) => {
  return ActivityWebhook.findOne({ alchemyWebhookId });
};
