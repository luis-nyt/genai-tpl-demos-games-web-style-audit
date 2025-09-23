export const dataTplAttr = 'data-tpl' as const;

/**
 * An enum whose members correspond to each of TPL's publicly exported React components.
 *
 * We use the enum to set the value of a `data-tpl` attribute applied to each TPL component's root
 * HTML or SVG element. Thus, the strings are as short as possible, since they're present in
 * production and we want to avoid ballooning our components' DOM output.
 *
 * The `data-tpl` attribute lets us inventory any given page's usage of TPL components, as we do
 * in [the Toolbar's TPL plugin](../../../toolbar/src/Plugins/TPL/index.tsx).
 *
 * Add to this enum when creating new TPL components in the library. This is also required when
 * adding the component to the test suites in [common.test.tsx](../common.test.tsx).
 *
 * Note that we test in the corresponding test file that each string value is unique. Whew!
 */
export enum DataTplValue {
  Body = 'bo',
  Box = 'b',
  Button = 'bu',
  Dialog = 'd',
  DialogContent = 'dc',
  Flex = 'f',
  Headline = 'h',
  HeadlineFeature = 'hf',
  HeadlineNews = 'hn',
  HeadlineOpinion = 'ho',
  HRule = 'hr',
  Icon = 'i',
  IconButton = 'ib',
  Label = 'la',
  Link = 'l',
  LinkBox = 'lb',
  PasswordInput = 'pi',
  Radio = 'r',
  RadioGroup = 'rg',
  Spinner = 'sp',
  Switcher = 'sw',
  StoryList = 'sl',
  StoryListItem = 'sli',
  StoryListItemContent = 'slic',
  StoryListSection = 'sls',
  Text = 't',
  TextButton = 'tb',
  TextInput = 'tx',
  Title = 'ti',
  Toast = 'to',
  TitleKarnak = 'tk',
  Typography = 'typ',
  VRule = 'vr',
}
