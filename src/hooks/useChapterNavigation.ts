import { CHAPTERS, TOTAL_CHAPTERS, CHAPTER_ICONS, ChapterKey } from '@/constants/chapters';

export interface ChapterNavInfo {
  path: string;
  title: string;
  iconKey: ChapterKey;
}

export function useChapterNavigation(currentPath: string) {
  const currentIndex = CHAPTERS.findIndex(c => c.path === currentPath);
  const currentChapter = currentIndex >= 0 ? CHAPTERS[currentIndex] : undefined;
  const currentKey = currentChapter?.key as ChapterKey | undefined;

  const prevChapter: ChapterNavInfo | undefined =
    currentIndex > 0
      ? {
          path: CHAPTERS[currentIndex - 1].path,
          title: CHAPTERS[currentIndex - 1].title,
          iconKey: CHAPTERS[currentIndex - 1].key as ChapterKey,
        }
      : undefined;

  const nextChapter: ChapterNavInfo | undefined =
    currentIndex < TOTAL_CHAPTERS - 1
      ? {
          path: CHAPTERS[currentIndex + 1].path,
          title: CHAPTERS[currentIndex + 1].title,
          iconKey: CHAPTERS[currentIndex + 1].key as ChapterKey,
        }
      : undefined;

  return {
    currentIndex,
    totalChapters: TOTAL_CHAPTERS,
    currentChapter,
    currentKey,
    prevChapter,
    nextChapter,
    IconCurrent: currentKey ? CHAPTER_ICONS[currentKey] : undefined,
    IconPrev: prevChapter ? CHAPTER_ICONS[prevChapter.iconKey] : undefined,
    IconNext: nextChapter ? CHAPTER_ICONS[nextChapter.iconKey] : undefined,
  };
}
