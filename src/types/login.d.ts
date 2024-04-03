export interface IAccount {
  name: string,
  // account: string,
  password: string | number
}

export interface IPhoneVerificationCode {
  phoneNum: string | number,
  verificationCode: string | number
}
