import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const Financial = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-financial"
      pageTitle="Financial Statements"
      subtitle="Audited Reports and Financial Disclosures"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="Audited Reports"
      sectionDescription="Year-wise audited financial reports of SSGMCE, Shegaon."
    >
      <DocumentsMarkdownContent pageId="documents-financial" />
    </DocumentsPageLayout>
  );
};

export default Financial;
