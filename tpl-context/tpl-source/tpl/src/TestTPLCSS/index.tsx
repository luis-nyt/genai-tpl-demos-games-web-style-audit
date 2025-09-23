import React from 'react';
import { cx } from 'pretty-lights';
import styles from './styles.module.scss';

export const TestTPLCSS = () => <div className={cx('test-css-tpl', styles.tpl1)}>Tiple</div>;
