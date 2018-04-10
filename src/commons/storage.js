const H_SEARCHPARAMS = 'H_SEARCHPARAMS';
const F_SEARCHPARAMS = 'F_SEARCHPARAMS';

export const storage = {
  set hSearchParams(val) {
    try {
      wx.setStorageSync(H_SEARCHPARAMS, val);
    } catch (e) {}
  },
  get hSearchParams() {
    let value = null;
    try {
      value = wx.getStorageSync(H_SEARCHPARAMS) || null;
    } catch (e) {}
    return value;
  },
  set fSearchParams(val) {
    try {
      wx.setStorageSync(F_SEARCHPARAMS, val);
    } catch (e) {}
  },
  get fSearchParams() {
    let value = null;
    try {
      value = wx.getStorageSync(F_SEARCHPARAMS) || null;
    } catch (e) {}
    return value;
  }
};
