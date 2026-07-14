import { useEffect, useState } from 'react';
import LearnLayout from '@/components/common/LearnLayout';
import MarkdownRenderer from '@/components/common/MarkdownRenderer';
import { ROUTES } from '@/constants/routes';
import { useChapterNavigation } from '@/hooks/useChapterNavigation';
import matter from 'gray-matter';

interface LearnMarkdownPageProps {
  chapterKey: string;
  mdContent: string;
}

export default function LearnMarkdownPage({ chapterKey, mdContent }: LearnMarkdownPageProps) {
  const { currentIndex, totalChapters, prevChapter, nextChapter, IconPrev, IconNext } = useChapterNavigation(
    ROUTES.LEARN[chapterKey as keyof typeof ROUTES.LEARN],
  );
  
  const [metadata, setMetadata] = useState<{
    title: string;
    subtitle: string;
    partTitle?: string;
    playgroundPath?: string;
    sections?: { id: string; title: string }[];
  }>({
    title: '',
    subtitle: '',
  });

  useEffect(() => {
    const parsed = matter(mdContent);
    setMetadata({
      title: parsed.data.title || '',
      subtitle: parsed.data.subtitle || '',
      partTitle: parsed.data.partTitle,
      playgroundPath: parsed.data.playgroundPath,
      sections: parsed.data.sections,
    });
  }, [mdContent]);

  const prev = prevChapter ? { ...prevChapter, icon: IconPrev && <IconPrev className="w-4 h-4" /> } : undefined;
  const next = nextChapter ? { ...nextChapter, icon: IconNext && <IconNext className="w-4 h-4" /> } : undefined;

  return (
    <LearnLayout
      title={metadata.title}
      subtitle={metadata.subtitle}
      currentIndex={currentIndex}
      totalChapters={totalChapters}
      partTitle={metadata.partTitle}
      playgroundPath={metadata.playgroundPath}
      prevChapter={prev}
      nextChapter={next}
      sections={metadata.sections}
    >
      <MarkdownRenderer>{mdContent}</MarkdownRenderer>
    </LearnLayout>
  );
}