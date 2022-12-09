export const ACCESS_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
export const ERROR_MESSAGE = { msg: "Something went wrong" };
export const SUCCESS_MESSAGE = { msg: "Success!" };
export const WRONG_PASS_MESSAGE = {
  msg: "Sorry, you entered the wrong password. Check your password again.",
};
export const USER_NOT_EXISTS_MESSAGE = { msg: "Entered email does not exist." };
export const INVALID_EMAIL_OR_PASS = {
  msg: "Entered email or pass is invalid.",
};
