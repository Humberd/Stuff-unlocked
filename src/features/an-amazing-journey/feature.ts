import { createFeature } from '../../utils/feature';

export const AnAmazingJourneyFeature = createFeature({
  name: 'An Amazing Journey',
  description: 'An Amazing Journey is a feature where you auto travel between 2 locations to maximize efficiency of a distance travel.',
  canExecute: (url) => url.endsWith('/main/anniversaryQuest'),
  execute: async () => {
    throw new Error('Not implemented');
  },
});
