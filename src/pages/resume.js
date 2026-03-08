import Layout from '@/components/Layout';
import Head from 'next/head';
import { HiOutlineDownload } from 'react-icons/hi';

const ResumePage = () => {
  const pdfPath = '/Praveen_Resume_Principal_Designer.pdf';

  return (
    <>
      <Head>
        <title>Resume - Praveen Gorakala</title>
        <meta name="description" content="Praveen Gorakala's resume" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Layout page="resume">
        <div className="resume-page">
          <div className="container">
            <div className="resume-header">
              <h1 className="page-title">Resume</h1>
              <a
                href={pdfPath}
                download="Praveen_Resume_Principal_Designer.pdf"
                className="download-btn"
              >
                <HiOutlineDownload />
                Download
              </a>
            </div>

            <div className="pdf-viewer">
              <iframe
                src={`${pdfPath}#toolbar=0&navpanes=0&zoom=page-fit`}
                title="Praveen Gorakala Resume"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ResumePage;
