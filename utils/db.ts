export const getUserFromDb = (email: string, pwHash: string) => {
  return email + pwHash;
};
