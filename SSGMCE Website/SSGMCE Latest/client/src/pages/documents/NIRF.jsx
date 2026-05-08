import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const NIRF = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-nirf"
      pageTitle="NIRF Rankings"
      subtitle="National Institutional Ranking Framework"
      backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      sectionTitle="Data Submitted to NIRF"
      sectionDescription="Year-wise NIRF documents and references."
    >
      <DocumentsMarkdownContent pageId="documents-nirf" />
    </DocumentsPageLayout>
  );
};

export default NIRF;
