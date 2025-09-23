import { createContext, useContext } from 'react';

export interface RadioGroupContextProps {
  name?: string;
}

/**
 * Provides `RadioGroup`'s `name` prop value to its child `Radio` components
 */
export const RadioGroupContext = createContext<RadioGroupContextProps>({});

/**
 * Used to access the parent `RadioGroup`'s `colorBehavior` prop value
 * within a child `Radio` component
 */
export const useRadioGroupContext = () => useContext(RadioGroupContext);
