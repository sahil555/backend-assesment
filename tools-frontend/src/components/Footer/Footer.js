import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./Footer.css";
const Footer = () => {
  return (
    <div className='footer-container'>
      <footer className='footer-collapse px-1 py-3'>
        <div className='col-lg-9 mx-auto'>
          <div className='row'>
            <div className='col-sm-6 col-md-3'>
              <div className='widget hidden-xs-down'>
                <h4 className='text-uppercase text-bold'>Product</h4>
                <ul className='widget-list list-unstyled p-0'>
                  <li>
                    <a href='https://www.gcc.com/product/create.stml'>
                      Create Websites
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/product/host.stml'>
                      Secure Cloud Hosting
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/product/engage.stml'>
                      Engage Your Audience
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/product/support.stml'>
                      Website Support
                    </a>
                  </li>
                </ul>
              </div>
              <div
                id='accordion'
                role='tablist'
                aria-multiselectable='true'
                className='widget hidden-sm-up'
              >
                <div role='tab' id='headingOne'>
                  <h4 className='card-header py-3 border-0 text-uppercase text-bold'>
                    <a
                      data-toggle='collapse'
                      data-parent='#accordion'
                      href='#collapseOne'
                      aria-expanded='false'
                      aria-controls='collapseOne'
                    >
                      Product
                    </a>
                  </h4>
                </div>
                <div
                  id='collapseOne'
                  className='collapse'
                  role='tabpanel'
                  aria-labelledby='headingOne'
                >
                  <div className='card-block'>
                    <ul className='widget-list list-unstyled p-0'>
                      <li>
                        <a href='https://www.gcc.com/product/create.stml'>
                          Create Websites
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/product/host.stml'>
                          Secure Cloud Hosting
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/product/engage.stml'>
                          Engage Your Audience
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/product/support.stml'>
                          Website Support
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-3'>
              <div className='widget hidden-xs-down'>
                <h4 className='text-uppercase text-bold'>Company</h4>
                <ul className='widget-list list-unstyled p-0'>
                  <li>
                    <a href='https://www.gcc.com/company/'>About</a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/careers/'>Careers</a>
                  </li>
                  <li>
                    <a
                      href='http://gcc.zendesk.com'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/pricing/'>Pricing</a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/pricing#faq'>FAQ</a>
                  </li>
                </ul>
              </div>
              <div
                id='accordion'
                role='tablist'
                aria-multiselectable='true'
                className='widget hidden-sm-up'
              >
                <div role='tab' id='headingTwo'>
                  <h4 className='card-header py-3 border-0 text-uppercase text-bold'>
                    <a
                      data-toggle='collapse'
                      data-parent='#accordion'
                      href='#collapseTwo'
                      aria-expanded='false'
                      aria-controls='collapseTwo'
                    >
                      Company
                    </a>
                  </h4>
                </div>
                <div
                  id='collapseTwo'
                  className='collapse'
                  role='tabpanel'
                  aria-labelledby='headingTwo'
                >
                  <div className='card-block'>
                    <ul className='widget-list list-unstyled'>
                      <li>
                        <a href='https://www.gcc.com/company/'>About</a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/careers/'>Careers</a>
                      </li>
                      <li>
                        <a
                          href='http://gcc.zendesk.com'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Support
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/pricing/'>Pricing</a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/pricing#faq'>FAQ</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='col-sm-6 col-md-3'>
              <div className='widget hidden-xs-down'>
                <h4 className='text-uppercase text-bold'>Resources</h4>
                <ul className='widget-list list-unstyled p-0'>
                  <li>
                    <a href='https://www.gcc.com/blog/'>Blog</a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/resources/ebooks/'>
                      eBooks
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/resources/whitepapers/'>
                      Whitepapers
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/comparison-guide/index.stml'>
                      Comparison Guide
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/grader/'>Website Grader</a>
                  </li>
                </ul>
              </div>
              <div
                id='accordion'
                role='tablist'
                aria-multiselectable='true'
                className='widget hidden-sm-up'
              >
                <div role='tab' id='headingThree'>
                  <h4 className='card-header py-3 border-0 text-uppercase text-bold'>
                    <a
                      data-toggle='collapse'
                      data-parent='#accordion'
                      href='#collapseThree'
                      aria-expanded='false'
                      aria-controls='collapseThree'
                    >
                      Resources
                    </a>
                  </h4>
                </div>
                <div
                  id='collapseThree'
                  className='collapse'
                  role='tabpanel'
                  aria-labelledby='headingThree'
                >
                  <div className='card-block'>
                    <ul className='widget-list list-unstyled p-0'>
                      <li>
                        <a href='https://www.gcc.com/blog/'>Blog</a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/resources/ebooks/'>
                          eBooks
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/resources/whitepapers/'>
                          Whitepapers
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/comparison-guide/index.stml'>
                          Comparison Guide
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/grader/'>
                          Website Grader
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='col-sm-6 col-md-3'>
              <div className='widget hidden-xs-down'>
                <h4 className='text-uppercase text-bold'>Get Help</h4>
                <ul className='widget-list list-unstyled list-unstyle p-0'>
                  <li>
                    <a
                      href='https://gcc.zendesk.com/hc/en-us'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/contact/'>Contact Us</a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/terms/privacy-policy.stml'>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href='https://www.gcc.com/terms/'>Terms</a>
                  </li>
                </ul>
              </div>
              <div
                id='accordion'
                role='tablist'
                aria-multiselectable='true'
                className='widget hidden-sm-up'
              >
                <div role='tab' id='headingFour'>
                  <h4 className='card-header py-3 border-0 text-uppercase text-bold'>
                    <a
                      data-toggle='collapse'
                      data-parent='#accordion'
                      href='#collapseFour'
                      aria-expanded='false'
                      aria-controls='collapseFour'
                    >
                      Get Help
                    </a>
                  </h4>
                </div>
                <div
                  id='collapseFour'
                  className='collapse'
                  role='tabpanel'
                  aria-labelledby='headingFour'
                >
                  <div className='card-block'>
                    <ul className='widget-list list-unstyled p-0'>
                      <li>
                        <a
                          href='https://gcc.zendesk.com/hc/en-us'
                          target='_blank'
                          rel='noreferrer'
                        >
                          Help Center
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/contact/'>Contact Us</a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/terms/privacy-policy.stml'>
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href='https://www.gcc.com/terms/'>Terms</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-sm-6 col-md-3'>
              <div className='widget'>
                <span
                  className='bttn bttn-google'
                  href='https://play.google.com/store/apps/details?id=com.developersmobiapp.explified'
                  title='Google Play'
                >
                  Social
                </span>
                <ul className='widget-list social-icon list-unstyled list-unstyle p-0'>
                  <li>
                    <a
                      href='https://www.facebook.com/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FacebookIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.instagram.com//'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <InstagramIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.linkedin.com/company/garg-consultancy-co/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.twitter.com/company//'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <TwitterIcon />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
