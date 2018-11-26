import React from "react";
import { render } from "react-dom";
import { message } from "antd";
import App from "./App";
import { register } from "./serviceWorker";

render(<App />, document.getElementById("root"));

register({
  onUpdate() {
    message.info("新版本已准备好，刷新页面即可更新", 0);
  }
});
