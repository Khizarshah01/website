import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const AICTE = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-aicte"
      pageTitle="AICTE Approvals"
      subtitle="All India Council for Technical Education"
      backgroundImage="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
      sectionTitle="AICTE Approvals"
      sectionDescription="Year-wise AICTE approval documents and extension of approval records."
    >
      <DocumentsMarkdownContent pageId="documents-aicte" />
    </DocumentsPageLayout>
  );
};

export default AICTE;
