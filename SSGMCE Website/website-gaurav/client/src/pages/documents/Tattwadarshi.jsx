import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const Tattwadarshi = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-tattwadarshi"
      pageTitle="e-Tattwadarshi"
      subtitle="Technical Magazine"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="e-Tattwadarshi"
      sectionDescription="Technical magazine issues and archive."
    >
      <DocumentsMarkdownContent pageId="documents-tattwadarshi" />
    </DocumentsPageLayout>
  );
};

export default Tattwadarshi;
