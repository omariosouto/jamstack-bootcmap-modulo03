## Aula 06: Indo além nas possibilidades de trabalhar com Arquivos Estáticos no NextJS

- Nosso projeto está relativamente pequeno, MAAAS
  - Você que não trabalha no facebook, mas se preocupa quando for pegar um site grande

- Falar de tempo de build e como isso impacta o dia a dia
  - Travar o time de colocar código novo no ar
  - Devops de novo
  - Performance e custo
    - Não gaste onde não precisa, request bom é request não feito

### Revalidate:
- https://reactions-demo.vercel.app/

Você retorna uma prop validate, com um tempo em segundos, e seu projeto vai
regerar essa página estática de X em X tempo

```js
export async function getStaticProps() {
revalidate: 1
```

- Gerar dados do site das eleições
- https://resultados.tse.jus.br/oficial/#/eleicao;e=e426;uf=sp;mu=71072/resultados

### Como lidar com um número altissimo de páginas
https://static-tweet.vercel.app/

- Como acontece: https://github.com/lfades/static-tweet/blob/master/pages/%5Btweet%5D.js#L20

- Ecommerce
  - Quantas páginas tem na amazon?
  - https://www.amazon.com.br/

- Dev em T BackEnd
  - Escalamento Vertical 
  - Escalamento Horizontal
  - https://aws.amazon.com/blogs/aws/low-cost-burstable-ec2-instances/