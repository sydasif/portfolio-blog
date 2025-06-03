import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function About() {
  const router = useRouter();
  const siteUrl = "https://www.netautomate.blog"; // Replace with your actual domain
  const pageUrl = `${siteUrl}${router.asPath}`;
  const pageTitle = "About Me - Net.Automate";
  const description =
    "About Syed Asif, Associate Network Engineer passionate about network automation, infrastructure as code, and modern DevOps practices.";
  const defaultOgImage = `${siteUrl}/images/og-default.png`; // Path to your default OG image

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="og:site_name" content="Net.Automate" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={defaultOgImage} />
      </Head>
      <div className="bg-gray-50 min-h-screen text-gray-800">
        <Navbar />
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              About Me
            </h1>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Hi, I&apos;m Syed Asif, a network automation enthusiast and software engineer.
              </p>
              <p>
                With experience in designing scalable solutions and automating
                repetitive tasks, I aim to bridge the gap between networking and
                software development. My journey in tech is driven by a constant
                curiosity and a desire to build efficient, resilient systems.
              </p>
            </div>
          </div>
        </main>
        <footer className="bg-gray-100 border-t border-gray-200 py-10 mt-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>
              © {new Date().getFullYear()} Net.Automate. All rights reserved.
            </p>
            <p className="text-sm mt-1">
              Exploring the intersection of networking and software.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
