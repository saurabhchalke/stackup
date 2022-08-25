import create from 'zustand';
import {devtools} from 'zustand/middleware';
import {magicInstance} from '../utils/magic';
import {RPCError, MagicUserMetadata} from '@magic-sdk/react-native';

interface MagicStateConstants {
  loading: boolean;
}

interface MagicState extends MagicStateConstants {
  loginWithEmailOTP: (email: string) => Promise<MagicUserMetadata | undefined>;

  clear: () => void;
}

const defaults: MagicStateConstants = {
  loading: false,
};

const STORE_NAME = 'stackup-magic-store';
const useMagicStore = create<MagicState>()(
  devtools(
    set => ({
      ...defaults,

      loginWithEmailOTP: async email => {
        try {
          set({loading: true});
          await magicInstance.auth.loginWithEmailOTP({email});
          const userMetaData = await magicInstance.user.getMetadata();
          magicInstance.user.logout();

          set({loading: false});
          return userMetaData ?? undefined;
        } catch (error) {
          set({loading: false});
          if (error instanceof RPCError && error.code === -10011) {
            // User canceled login
            return;
          }

          throw error;
        }
      },

      clear: () => {
        magicInstance.user.logout();
        set({...defaults});
      },
    }),
    {name: STORE_NAME},
  ),
);

export const useMagicStoreRemoveWalletSelector = () =>
  useMagicStore(state => ({clear: state.clear}));

export const useMagicStoreSecuritySheetsSelector = () =>
  useMagicStore(state => ({
    loading: state.loading,
    loginWithEmailOTP: state.loginWithEmailOTP,
  }));
