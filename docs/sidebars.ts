import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  gettingStartedSidebar: [
    { type: 'doc', id: 'getting-started' },
    { type: 'doc', id: 'googledrive' },
    { type: 'doc', id: 'onedrive' },
    { type: 'doc', id: 'dropbox' },
  ],
  apiSidebar: [
    {
      type: 'category',
      label: 'Typedoc API',
      link: { type: 'doc', id: 'api/index' },
      items: require('./docs/api/typedoc-sidebar.cjs'),
    },
  ],
  contributingSidebar: [
    { type: 'doc', id: 'contributing' },
    { type: 'doc', id: 'sample-app' },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
