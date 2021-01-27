import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternaScreen({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQInternaScreen.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternaScreen, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Pergunta',
    },
  },
});

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
