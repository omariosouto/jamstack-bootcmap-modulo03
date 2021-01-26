## Aula 04: A arquitetura Santo Graal para páginas com estrutura reusável no NextJS

- Se olharmos o FAQ e a Home, temos duplicidade de:
  - Componentes
  - State
  - Estrutura generica

- Mover TODOS os componentes genericos para o website page wrapper
  - Pegar do gist
    - https://gist.github.com/omariosouto/ce17a82eeef1daead8de8dcf4df25964

  - Vamos resolver isso
    - /wrappers/WebsitePage/index.js
      `<WebsitePageWrapper />`

- Na home precisamos abrir o menu, como faz agora?
  - Externalizar state e deixar generico
  - Falar do styled components
```js
export const WebsitePageContext = React.createContext({
  toggleModalCadastro: () => {},
});

export default function WebsitePageWrapper({
  children,
  seoProps,
  menuProps,
  pageBoxProps,
}) {
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <WebsitePageContext.Provider
      value={{
        toggleModalCadastro: () => {
          setModalState(!isModalOpen);
        },
      }}
    >
```
```js
    const websitePageContext = React.useContext(WebsitePageContext);
    onClick={() => websitePageContext.toggleModalCadastro()}
```
  - Cria um contexto
  - Vamos deixar o state pra abrir o modal de cadastro no nivel mais alto da aplicação acessível por qualquer lugar

============================================================

- Podemos ir além nessa organização:
  - Podemos ter um centralizador das nossas configurações 100% a parte do NextJS
  - Vamos criar uma função de configuração das páginas

```js
export default websitePageHOC(HomeScreen, {
  pageWrapperProps: {
    pageBoxProps: {
      backgroundImage: 'url(/images/bubbles.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
  },
});
```

- Mover tudo pra uma função e criar um Provider do nosso projeto

```js
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import WebsitePageWrapper from '../index';
import WebsitePageProvider from '../provider';

export default function websitePageHOC(Component, { pageWrapperProps }) {
  return (props) => (
    <>
      <WebsitePageProvider>
        <WebsitePageWrapper {...pageWrapperProps}>
          <Component {...props} />
        </WebsitePageWrapper>
      </WebsitePageProvider>
    </>
  );
}
```