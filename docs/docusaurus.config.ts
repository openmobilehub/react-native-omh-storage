import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'React Native OMH Storage',
  tagline: 'OMH Storage bindings for React Native',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://openmobilehub.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-native-omh-storage',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'openmobilehub', // Usually your GitHub org/user name.
  projectName: 'react-native-omh-storage', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/openmobilehub/react-native-omh-storage/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    navbar: {
      title: 'React Native OMH Storage',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          position: 'left',
          label: 'Getting started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'contributingSidebar',
          position: 'left',
          label: 'Contributing',
        },
        {
          href: 'https://github.com/openmobilehub/react-native-omh-storage',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation & guides',
          items: [
            {
              label: 'Getting started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/openmobilehub',
            },
            {
              label: 'Discord',
              href: 'https://discord.com/invite/yTAFKbeVMw',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/openmobilehub/react-native-omh-storage',
            },
            {
              label: 'Android OMH Storage GitHub',
              href: 'https://github.com/openmobilehub/android-omh-storage',
            },
            {
              label: 'OMH Project Homepage',
              href: 'https://openmobilehub.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenMobileHub. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: [
          '../packages/core/src/index.tsx',
          '../packages/googledrive/src/index.tsx',
          '../packages/onedrive/src/index.tsx',
          '../packages/dropbox/src/index.tsx',
        ],
        tsconfig: '../package-tsconfig.json',
        skipErrorChecking: true,
      },
    ],
  ],
};

export default config;
