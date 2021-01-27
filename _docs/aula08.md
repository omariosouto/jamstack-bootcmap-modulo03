## Aula 08: Headers, Segurança e Performance!

- Headers servem para muitas coisas
  - Cache
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
  - Redirects
    - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location
  - E segurança!
    - https://www.netsparker.com/blog/web-security/clickjacking-attacks/
    - 

```js
async headers() {
    return [
      {
        source: '/app/:path*/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
```

- Isso não atrapalha seu site em nada, e da forma que fizemos, você ainda consegue selecionar quais páginas são "proibidas" de outros carregarem via iframe


- Fazer uma tour pelo módulo
  - Analisar a aba network do Navegador
    - Falar de TTFB
    - CDN
    - Cache
    - ...