import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const NAAC = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-naac"
      pageTitle="NAAC Accreditation"
      subtitle="National Assessment and Accreditation Council"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="NAAC Accreditation"
      sectionDescription="NAAC accreditation status, peer team reports, and certificates."
    >
      <DocumentsMarkdownContent pageId="documents-naac" />
    </DocumentsPageLayout>
  );
};

export default NAAC;
