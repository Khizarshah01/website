import DocumentsPageLayout from "../../components/DocumentsPageLayout";
import DocumentsMarkdownContent from "../../components/DocumentsMarkdownContent";

const StudentForms = () => {
  return (
    <DocumentsPageLayout
      pageId="documents-student-forms"
      pageTitle="Student Forms"
      subtitle="Student Forms and Applications"
      backgroundImage="https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=80"
      sectionTitle="Student Forms"
      sectionDescription="Forms, applications, and student-related document links."
    >
      <DocumentsMarkdownContent pageId="documents-student-forms" />
    </DocumentsPageLayout>
  );
};

export default StudentForms;
