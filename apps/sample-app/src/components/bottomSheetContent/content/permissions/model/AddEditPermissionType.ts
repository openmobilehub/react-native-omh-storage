import { Provider } from '@/constants/provider.ts';

export enum AddEditPermissionType {
  USER = 'User',
  GROUP = 'Group',
  DOMAIN = 'Domain',
  ANYONE = 'Anyone',
}

const DROPBOX_DISABLED_TYPE = [
  AddEditPermissionType.GROUP,
  AddEditPermissionType.DOMAIN,
  AddEditPermissionType.ANYONE,
];
const ONEDRIVE_DISABLED_TYPE = [
  AddEditPermissionType.DOMAIN,
  AddEditPermissionType.ANYONE,
];

export const getTypeOptions = (provider: Provider | null) => {
  const types = Object.entries(AddEditPermissionType);
  const disabledType = getDisabledTypes(provider);

  return types
    .filter(([_key, label]) => !disabledType.includes(label))
    .map(([key, label]) => ({
      key,
      label,
      value: label,
    }));
};

const getDisabledTypes = (provider: Provider | null) => {
  switch (provider) {
    case Provider.DROPBOX:
      return DROPBOX_DISABLED_TYPE;
    case Provider.ONEDRIVE:
      return ONEDRIVE_DISABLED_TYPE;
    default:
      return [];
  }
};
