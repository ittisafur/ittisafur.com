import styles from '../styles/Home.module.css';
import Card from '../components/card';
import fs from 'fs';
import matter from 'gray-matter';
import { ArticleMeta } from '../interfaces/article';
import { NextPage } from 'next';

interface IProps {
  articles: ArticleMeta[];
}

const Home: NextPage<IProps> = ({ articles }) => {
  return (
    <div className={styles.container}>
      {articles.map((article, i) => (
        <Card key={i} article={article} />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const files = fs.readdirSync('uploads');

  let articles = files.map((file) => {
    const data = fs.readFileSync(`uploads/${file}`).toString();

    return {
      ...matter(data).data,
      slug: file.split('.')[0],
    };
  });

  return {
    props: {
      articles: articles,
    },
  };
}

export default Home;
