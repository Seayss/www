# www

[![GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/mtdhb/www.svg?branch=master)](https://travis-ci.org/mtdhb/www)

由于国外服务器速度不稳定，本站使用两个域名：

- <https://mtdhb.org> - 部署在 [netlify](https://app.netlify.com)
- <https://www.mtdhb.org> - 部署在 [gh-pages](https://pages.github.com)

大家根据各自的速度，访问不同的地址

## 开发

环境要求 Node.js 9.x

```bash
npm i
npm run dev
```

## 发布

```bash
npm run build
```

将生成的 `build/` 目录提交到网站根目录

并参考 `public/_headers`、`public/_redirects` 在你的静态服务器上做相关配置 [FAQ](https://github.com/mtdhb/mtdhb/issues/135)
