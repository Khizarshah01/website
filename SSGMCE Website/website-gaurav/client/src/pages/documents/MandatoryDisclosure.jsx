import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const MandatoryDisclosure = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-mandatory"
      pageTitle="Mandatory Disclosure"
      subtitle="AICTE Mandatory Disclosure Documents"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="Mandatory Disclosure"
      sectionDescription="Statutory mandatory disclosure documents as required by AICTE."
    >
      <DocumentsMarkdownContent pageId="documents-mandatory" />
    </DocumentsPageLayout>
  );
};

export default MandatoryDisclosure;
