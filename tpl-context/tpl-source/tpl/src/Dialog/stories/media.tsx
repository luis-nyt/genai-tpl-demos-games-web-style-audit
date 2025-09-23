import React from 'react';
import { FullMoonArtwork as FullMoonArtworkComponent } from '../../StoryList/stories/PositionAwareMediaPlaceholder.js';
import { SuperTIcon as SuperTIconComponent } from '../../generated/Icons/index.js';
import { spaceScale } from '../../index.js';
import { color } from '../../tokens/index.js';

export const None = undefined;

export const FullMoonArtwork = <FullMoonArtworkComponent style={{ width: '100%' }} />;

export const SuperTIcon = (
  <SuperTIconComponent
    size={20}
    aria-label="NYTimes Super T logo"
    style={{
      boxSizing: 'border-box',
      width: '4rem',
      height: '4rem',
      margin: `${spaceScale.get(4)} auto 0`,
      borderRadius: 9999,
      padding: '0.5rem',
      background: color.background.tertiary,
    }}
  />
);
