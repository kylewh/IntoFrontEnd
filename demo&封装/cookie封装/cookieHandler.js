const cookieHandler = {
  setItem: (
    opt = {
      key: "",
      value: "",
      maxAge: "",
      domain: "",
      path: "",
      secure: ""
    }
  ) => {
    let ret = [], str;
    if (opt.key || opt.value) {
      ret.push(
        `${encodeURIComponent(opt.key)}=${encodeURIComponent(opt.value)}`
      );
      opt.maxAge
        ? ret.push(`max-age=${new Date(opt.maxAge).toUTCString()}`)
        : "";
      opt.domain ? ret.push(`path=${opt.path}`) : "";
      opt.secure ? ret.push("secure") : "";
      str = ret.join("; ");
      document.cookie = str;
    }
    return str;
  },
  getItem: key => {
    let cookies = document.cookie.split("; "), ret = [];
    cookies.forEach((val, idx) => {
      if (val.indexOf(key + "=") === 0) {
        let value = decodeURIComponent(val.slice(val.indexOf("=") + 1));
        ret.push(value);
      }
      return ret.length > 1 ? ret : ret[0];
    });
  },
  getAll: () => {
    let cookies = document.cookie.split("; "), ret = {};
    cookies.forEach(val => {
      let pair = val.split("=");
      ret[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    });
    return ret;
  },
  clear: () => {
    let cookies = document.cookie.split("; ");
    cookies.forEach((val, idx) => {
      document.cookie =
        cookies[idx].slice(0, cookies[idx].indexOf("=")) +
        ";expires = " +
        new Date(0);
    });
  }
};
