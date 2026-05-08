import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const Policies = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-policies"
      pageTitle="Policies & Procedures"
      subtitle="Institute Rules, Regulations & Guidelines"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="Policies and Procedures"
      sectionDescription="Official institutional policies and procedures at SSGMCE, Shegaon."
    >
      <DocumentsMarkdownContent pageId="documents-policies" />
    </DocumentsPageLayout>
  );
};

export default Policies;
