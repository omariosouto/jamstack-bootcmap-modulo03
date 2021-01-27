## Aula 07: Como fazer redirects no NextJS

- No dia a dia como Front End precisamos fazer coisas que ajudam a galera de marketing
  - Redirects!

- É algo de server, mas que provavelmente o Front faz toda vez!
  - http://alura.com.br/devsoutinho
    - Vira http://alura.com.br/promocao/devsoutinho

- Vamos fazer pro login
  - temos /app/login, vamos fazer ficar /login e redireciona pra outra página

- Vamos criar o `next.config.js`
  - https://nextjs.org/docs/api-reference/next.config.js/introduction

- Mostra na aba network, como funciona um redirect
  - https://moz.com/learn/seo/redirection
    - 301, "Moved Permanently"—recommended for SEO
    - 302, "Found" or "Moved Temporarily"
    - Quem faz o redirect é o browser e redirect não existe
      - https://httpstatusdogs.com/
      - https://http.cat/

```js
module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/login/',
        destination: '/app/login',
        permanent: true, // true=308 | false=307
      },
    ];
  },
};
```