import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the jlab-src extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jlab-src:plugin',
  description: 'Stanford Research Computing Enhancements',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension jlab-src is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jlab-src settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for jlab-src.', reason);
        });
    }
  }
};

export default plugin;
