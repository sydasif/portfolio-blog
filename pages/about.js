import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Head>
        <title>About Me - NetAuto Blog</title>
        <meta name="description" content="About Syed Asif, Associate Network Engineer passionate about network automation, infrastructure as code, and modern DevOps practices." />
      </Head>
      <div className="bg-gray-50 min-h-screen text-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Me</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm Syed Asif, an Associate Network Engineer passionate about network automation, infrastructure as code, and modern DevOps practices.
              With experience in designing scalable solutions and automating repetitive tasks,
              I aim to bridge the gap between networking and software development.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}