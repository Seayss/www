import React from "react";
import { Form } from "antd";

const list = [
  {
    href:
      "https://note.youdao.com/noteshare?id=2761e33a66c4b51a8226dd22a89e87c1",
    text: "[贡献 QQ] 如何贡献饿了么 cookie"
  },
  {
    href:
      "http://note.youdao.com/noteshare?id=65fbec7df78923c39cb1fbee54c6e074",
    text: "[贡献微信] 如何贡献饿了么星选 cookie"
  },
  {
    href:
      "http://note.youdao.com/noteshare?id=0290812f8131bed392ed5f037f0c3b5c",
    text: "[贡献微信] 如何贡献美团微信 cookie",
    style: { textDecoration: "line-through" }
  }
];

export default ({ children, onSubmit }) => (
  <Form onSubmit={onSubmit} className="login-form">
    {children}
    <ul>
      {list.map(item => (
        <li>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            style={item.style}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </Form>
);
