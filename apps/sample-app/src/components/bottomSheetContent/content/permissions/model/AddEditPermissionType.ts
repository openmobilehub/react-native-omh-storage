export enum AddEditPermissionType {
  USER = 'User',
  GROUP = 'Group',
  Domain = 'Domain',
  Anyone = 'Anyone',
}

export const typeOptions = Object.entries(AddEditPermissionType).map(
  ([key, label]) => ({
    key,
    label,
    value: label,
  })
);
