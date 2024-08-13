import { Provider } from '@/constants/provider.ts';

export enum AddEditPermissionType {
  USER = 'User',
  GROUP = 'Group',
  Domain = 'Domain',
  Anyone = 'Anyone',
}

const DROPBOX_TYPE_OPTIONS = [AddEditPermissionType.USER];

export const getTypeOptions = (provider: Provider | null) => {
  let types = Object.entries(AddEditPermissionType);
  switch (provider) {
    case Provider.DROPBOX:
      types = types.filter(([_key, label]) =>
        DROPBOX_TYPE_OPTIONS.includes(label)
      );
  }
  return types.map(([key, label]) => ({
    key,
    label,
    value: label,
  }));
};
