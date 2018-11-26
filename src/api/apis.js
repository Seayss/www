const apis = {
  getCaptcha: "user/registerCaptcha",
  getRegisterCode: "user/registerMail",
  register: "user/register",
  login: "user/login",
  getUser: "user",
  cookie: "user/cookie",
  deleteCookie: "user/cookie",
  getAvailableCount: "user/number",
  getHongbao: "user/receiving",
  getHongbaoHistory: "user/receiving",
  refresh: "user/receiving",
  zhuangbi: "zhuangbi",
  resetPassword: "user/resetPassword",
  resetPasswordCaptcha: "user/resetPasswordCaptcha",
  resetPasswordMail: "user/resetPasswordMail",
  getRank: "rank",
  getPie: "pie",
  getTrend: "trend",
  createPay: "pay/create",
  getPayList: "pay/list",
  getNotice: "notice.json" // 为了方便随时更新公告，直接在 JSON 中维护
};

Object.keys(apis).forEach(
  key => (apis[key] = "https://api.mtdhb.org/" + apis[key])
);

export default apis;
