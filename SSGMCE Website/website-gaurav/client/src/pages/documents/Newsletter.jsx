import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const Newsletter = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-newsletter"
      pageTitle="Newsletters"
      subtitle="Annual College Publications"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="Newsletters"
      sectionDescription="Annual newsletters showcasing institutional achievements and events."
    >
      <DocumentsMarkdownContent pageId="documents-newsletter" />
    </DocumentsPageLayout>
  );
};

export default Newsletter;
