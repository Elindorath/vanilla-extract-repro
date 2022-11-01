import { globalStyle } from '@vanilla-extract/css';

import { colors, Colors } from './colors';


const minHeightTrick = {
  minHeight: '100%',
  height: 0,
};

globalStyle('html', {
  fontSize: 10,
  ...minHeightTrick,
});

globalStyle('*', {
  padding: 0,
  margin: 0,
  borderWidth: 0,
  appearance: 'none',
  backgroundColor: 'transparent',
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
});

globalStyle('body', {
  backgroundColor: colors.gray800,
  color: Colors.white.darken(0.1).display(),
  fontSize: '1.6rem',
  ...minHeightTrick,
});

globalStyle('#root', minHeightTrick);
