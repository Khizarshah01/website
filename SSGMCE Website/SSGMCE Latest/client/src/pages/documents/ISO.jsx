import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const ISO = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-iso"
      pageTitle="ISO Certification"
      subtitle="Quality Management System - ISO 9001-2015"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="ISO 9001-2015 Quality Management System"
      sectionDescription="ISO quality certification, committee details, and quality manual documents."
    >
      <DocumentsMarkdownContent pageId="documents-iso" />
    </DocumentsPageLayout>
  );
};

export default ISO;
