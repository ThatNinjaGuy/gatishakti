import account from "./account";
import booking from "./booking";
import featuredServices from "./featuredServices";
import hotelRoom from "./productDetails";
import marketProducts from "./marketProducts";
import review from "./review";
import user from "./user";
import verificationToken from "./verificationToken";

// Map out the various schemas for creation of databases
export const schemaTypes = [
  user,
  account,
  booking,
  hotelRoom,
  review,
  verificationToken,
  featuredServices,
  marketProducts,
];
