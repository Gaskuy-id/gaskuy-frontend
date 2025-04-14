import React from 'react';
import Layout from '../../components/Layout/Layout';

const Home = () => {
  return (
    <Layout>
      <section className="p-4">
        <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
        <p>This content will never get hidden under the navbar!</p>
      </section>
    </Layout>
  );
};

export default Home;