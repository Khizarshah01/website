import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const NBA = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-nba"
      pageTitle="NBA Accreditation"
      subtitle="National Board of Accreditation"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="NBA Accreditation"
      sectionDescription="Program-wise NBA accreditation details and documents."
    >
      <DocumentsMarkdownContent pageId="documents-nba" />
    </DocumentsPageLayout>
  );
};

export default NBA;
