import React from "react";
import GenericContentPage from "../components/GenericContentPage";
import AboutSidebar from "../components/AboutSidebar";

const Contact = () => {
  // Use CMS-backed page `contact-us`. Seed the page on the server if missing.
  return <GenericContentPage pageId="contact-us" sidebar={<AboutSidebar />} />;
};

export default Contact;
