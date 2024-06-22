import React from "react";
import Layout from "@components/Layout";

const MyWorkPage = () => {
  return (
    <Layout>
      <h1>My Work</h1>
      <p>Here's a showcase of my projects and accomplishments.</p>
      <div>
        <h2>Project 1</h2>
        <p>
          Description of Project 1, what it involved, technologies used, and the
          outcome.
        </p>
      </div>
      <div>
        <h2>Project 2</h2>
        <p>
          Description of Project 2, what it involved, technologies used, and the
          outcome.
        </p>
      </div>
      {/* Add more projects as needed */}
    </Layout>
  );
};

export default MyWorkPage;
