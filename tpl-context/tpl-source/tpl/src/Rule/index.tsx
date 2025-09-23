import React, { forwardRef } from 'react';
import {
  HRule as FoundationHRule,
  HRuleProps as FoundationHRuleProps,
  VRule as FoundationVRule,
  VRuleProps as FoundationVRuleProps,
  RuleTokens,
  useColorBehaviorContext,
} from '@nyt/foundation';
import { cx } from 'pretty-lights';
import { CommonProps, dataTplAttr, DataTplValue } from '../util/index.js';
import {
  createHRuleColorBehaviorStyles,
  createVRuleColorBehaviorStyles,
} from './colorBehaviorStyles.js';
import { useTplSxProp } from '../system/index.js';

interface HRuleProps
  extends Omit<FoundationHRuleProps, 'tokens' | 'sx'>,
    Omit<CommonProps, 'children'> {}

const emptyRuleTokens: RuleTokens = {
  horizontal: { primary: '', secondary: '', tertiary: '' },
  vertical: { primary: '', secondary: '' },
};

const HRule = forwardRef<HTMLHRElement, HRuleProps>(
  ({ className, colorBehavior: colorBehaviorProp, variant = 'primary', sx, ...rest }, ref) => {
    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const colorBehaviorClassNames = createHRuleColorBehaviorStyles(colorBehavior);

    return (
      <FoundationHRule
        ref={ref}
        className={cx(colorBehaviorClassNames[variant], className, systemClass)}
        tokens={emptyRuleTokens}
        variant={variant}
        {...{ [dataTplAttr]: DataTplValue.HRule, ...rest }}
      />
    );
  }
);

interface VRuleProps
  extends Omit<FoundationVRuleProps, 'tokens' | 'sx'>,
    Omit<CommonProps, 'children'> {}

const VRule = forwardRef<HTMLHRElement, VRuleProps>(
  ({ className, colorBehavior: colorBehaviorProp, variant = 'primary', sx, ...rest }, ref) => {
    const systemClass = useTplSxProp(sx);
    const { colorBehavior: colorBehaviorContext } = useColorBehaviorContext();
    const colorBehavior = colorBehaviorProp ?? colorBehaviorContext;
    const colorBehaviorClassNames = createVRuleColorBehaviorStyles(colorBehavior);

    return (
      <FoundationVRule
        ref={ref}
        className={cx(colorBehaviorClassNames[variant], className, systemClass)}
        tokens={emptyRuleTokens}
        variant={variant}
        {...{ [dataTplAttr]: DataTplValue.VRule, ...rest }}
      />
    );
  }
);

export { HRule, VRule };
export type { HRuleProps, VRuleProps };
