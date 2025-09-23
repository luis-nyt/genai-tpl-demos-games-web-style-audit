import { createContext } from 'react';
import type { StoryListProps } from './index.js';

export interface StoryListDividersContextProps
  extends Pick<StoryListProps, 'sectionDivider' | 'itemDivider'> {}

export const StoryListDividersContext = createContext<StoryListDividersContextProps>({
  sectionDivider: undefined,
  itemDivider: undefined,
});
