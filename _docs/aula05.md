## Aula 05: Gerando Páginas Dinamicamente com o NextJS

> Vamos gerar nosso FAQ de forma dinâmica e estática risos'

- https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
- https://gist.github.com/omariosouto/f223dda258375674fe44cad4166cc7c4

- Começa falando que o FAQ precisa ter as sub páginas
  - vamos fazer!

- cria o `pages/faq/[slug].js`

```js
import React from 'react';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInterna(props) {
  console.log(props);

  return (
    <div>
      Página interna do FAQ!
    </div>
  );
}

export default websitePageHOC(FAQInterna, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Pergunta',
    },
  },
});
```

- Depois gera o ERRO

```js
export async function getStaticProps() {
  return {
    props: {
      bla: 'oi',
    },
  };
}
```

- Precisamos ter o getStaticPaths
  - copia o exemplo do site e faz ficar assim:
```js
export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { slug: 'qual-e-a-raiz-quadrada-de-2' },
      },
      {
        params: { slug: 'oi2' },
      },
    ],
    fallback: false, // se não existir a página, ele manda pra 404
    // Próximo vídeo falaremos com mais carinho quando usar isso aqui
  };
}
```

- Os arquivos da pasta pages, são do "Next", seu código só ta configurando ele pra funcionar como esperado


- Agora, vamos pegar os dados que montam as páginas internas do FAQ

```js
export async function getStaticPaths() {
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq').then(async (res) => {
    const response = await res.json();
    return response.data;
  });

  const paths = faqCategories.reduce((acc, category) => [
    ...acc,
    ...category.questions.map((question) => ({
      params: {
        slug: question.slug,
      },
    })),
  ], []);

  return {
    paths,
    fallback: false, // se não existir a página, ele manda pra 404
  };
}
```


```js
export async function getStaticProps(args) {
  const { params } = args;

  const currentSlug = params.slug;
  const faqCategories = await fetch('https://instalura-api.vercel.app/api/content/faq').then(async (res) => {
    const response = await res.json();
    return response.data;
  });

  const pageInfo = faqCategories.reduce((acc, category) => {
    const currentQuestion = category.questions.find((question) => question.slug === currentSlug);

    return {
      ...acc,
      category,
      question: currentQuestion,
    };
  }, {});

  return {
    props: {
      question: pageInfo.question,
      category: pageInfo.category,
    },
    revalidate: 1,
  };
}
```


=========

- Criando blog com Markdown: https://www.youtube.com/watch?v=n5hnE1yPde0