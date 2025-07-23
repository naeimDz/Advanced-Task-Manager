import { extractLinks } from "@/lib/extractLinks";
import { useState } from "react";

interface FormData {
  title: string;
  content: string;
  tags: string;
  isPublic: boolean;
}

// hooks/useNoteForm.ts
export const useNoteForm = ({ addNote }: { addNote: Function }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    tags: '',
    isPublic: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('يرجى ملء العنوان والمحتوى');
      return false;
    }

    setIsSubmitting(true);
    try {
      const noteData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        isPublic: formData.isPublic,
        linkedNotes: extractLinks(formData.content),
      };

      await addNote(noteData);
      setFormData({ title: '', content: '', tags: '', isPublic: false });
      return true;
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الإضافة');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, setFormData, isSubmitting, submit };
};
