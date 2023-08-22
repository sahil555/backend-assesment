import React from "react";
import facebook from "../../assets/svgs/facebook.svg";
import instagram from "../../assets/svgs/instagram.svg";
import github from "../../assets/svgs/github.svg";
import linkedin from "../../assets/svgs/linkedin.svg";
import "./CreateAccountItem.css";

const CreateAccountItem = ({
  linkedinClicked,
  facebookClicked,
  githubClicked,
  instagramClicked,
}) => {
  // const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    alert("Clicked");
    // setOpen(true);
  };

  return (
    <div className='account-btns'>
      {facebookClicked && (
        <div className='account-add-btn' onClick={handleClickOpen}>
          <img src={facebook} className='social-add-btn' alt='facebook' />
        </div>
      )}
      {instagramClicked && (
        <div className='account-add-btn' onClick={handleClickOpen}>
          <img src={instagram} className='social-add-btn' alt='instagram' />
        </div>
      )}
      {githubClicked && (
        <div className='account-add-btn' onClick={handleClickOpen}>
          <img src={github} className='social-add-btn' alt='github' />
        </div>
      )}
      {linkedinClicked && (
        <div className='account-add-btn' onClick={handleClickOpen}>
          <img src={linkedin} className='social-add-btn' alt='linkedin' />
        </div>
      )}
    </div>
  );
};
export default CreateAccountItem;
