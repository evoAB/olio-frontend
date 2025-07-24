export const UserRole = {
  Admin: "ADMIN",
  Seller: "SELLER",
  Pending_Seller: "PENDING_SELLER",
  User: "USER",
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
