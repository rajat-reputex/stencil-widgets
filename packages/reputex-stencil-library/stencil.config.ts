import { Config } from '@stencil/core';
import tailwind, { tailwindHMR, setPluginConfigurationDefaults } from 'stencil-tailwind-plugin';
import tailwindcss from 'tailwindcss';
import tailwindConf from './tailwind.config';
import autoprefixer from 'autoprefixer';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

const exludingComponents = [
  'asset-line',
  'pending-state',
  'score-loaded',
  'asset-circle-right',
  'asset-maximize',
  'asset-rectangle-left',
  'asset-rectangle-middle',
  'asset-rectangle-right',
  'asset-rectangle-top',
  'asset-reputex-logo',
];
setPluginConfigurationDefaults({
  tailwindConf,
  tailwindCssPath: './src/styles/tailwind.css',
  postcss: {
    plugins: [tailwindcss(), autoprefixer()],
  },
});

export const config: Config = {
  namespace: 'reputex-stencil-library',
  plugins: [tailwind(), tailwindHMR()],
  devServer: {
    reloadStrategy: 'pageReload',
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: 'reputex-stencil-library',
      proxiesFile: '../reputex-react-widget/lib/components/stencil-generated/index.ts',
      excludeComponents: exludingComponents,
    }),

    vueOutputTarget({
      componentCorePackage: 'reputex-stencil-library',
      proxiesFile: '../reputex-vue-widget/lib/components.ts',
      excludeComponents: exludingComponents,
    }),
  ],
  testing: {
    browserHeadless: 'new',
  },
};
