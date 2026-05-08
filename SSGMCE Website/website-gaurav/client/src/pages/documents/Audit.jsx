import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const Audit = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-audit"
      pageTitle="Sustainable Audit"
      subtitle="Energy, Environmental and Green Audit Reports"
      backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
      sectionTitle="Sustainability Audit Reports"
      sectionDescription="Energy, environmental, and green audit reports for the institute."
    >
      <DocumentsMarkdownContent pageId="documents-audit" />
    </DocumentsPageLayout>
  );
};

export default Audit;
