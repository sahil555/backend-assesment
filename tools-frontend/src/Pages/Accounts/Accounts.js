import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CreateAccountModal from "../../components/CreateAccountModal/CreateAccountModal";
import CreateAccountItem from "../../components/CreateAccountItem/CreateAccountItem";
import "./Accounts.css";
const Accounts = () => {
  const [linkedinClicked, setLinkedInClick] = useState(false);
  const [facebookClicked, setFacebookClick] = useState(false);
  const [githubClicked, setGithubClick] = useState(false);
  const [instagramClicked, setInstagramClick] = useState(false);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <Layout title='Accounts' header='Accounts'>
        <div className='account-container'>
          <CreateAccountItem
            linkedinClicked={linkedinClicked}
            facebookClicked={facebookClicked}
            githubClicked={githubClicked}
            instagramClicked={instagramClicked}
          />
          <CreateAccountModal
            setInstagramClick={setInstagramClick}
            setGithubClick={setGithubClick}
            setLinkedInClick={setLinkedInClick}
            setFacebookClick={setFacebookClick}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Accounts;
