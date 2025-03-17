import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { showDialog } from '@jupyterlab/apputils';
import { NistWidget } from './widget';
import { IStateDB } from '@jupyterlab/statedb';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ICommandPalette } from '@jupyterlab/apputils';
import { ReadonlyJSONObject } from '@lumino/coreutils';

const PLUGIN_ID = 'src-jl:plugin';
/**
 * Initialization data for the src-jl extension.
 */
const plugin: JupyterFrontEndPlugin < void > = {
  id: PLUGIN_ID,
  description: 'Stanford Research Computing Enhancements',
  autoStart: true,
  requires: [ICommandPalette, IStateDB],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, state: IStateDB) => {
    console.log('JupyterLab extension src-jl is activated!');

    let hasConsent = false;
    app.restored
      // Get the state object
      .then(() => state.fetch(PLUGIN_ID))
      .then(value => {
        if (value) {
          hasConsent = (value as ReadonlyJSONObject)['hasConsent'] as boolean;
          console.log(`hasConsent ${hasConsent} read from state.`);
        }

        if (!hasConsent) {

          const content = new NistWidget();

          showDialog({
              title: "Welcome to Carina",
              body: content,
              hasClose: false,
              buttons: [ // List of buttons
                {
                  className: 'blah',
                  label: 'I agree', // Button label
                  caption: 'Agree with policies', // Button title
                  accept: true, // Whether this button will discard or accept the dialog,
                  displayType: "default",
                  iconClass: '',
                  ariaLabel: 'Agree with policies',
                  iconLabel: 'I agree',
                  actions: ['string']
                }
              ],
            })
            .then(result => {
              // If the user click on the accept button of the dialog
              if (result.button.accept) {
                // Get the user hasConsent
                hasConsent = true;
                // Save the hasConsent in the state database
                return state.save(PLUGIN_ID, { hasConsent });
              }
            })
            .catch(e => console.log(e));
        } else {
          console.log(`no popup ${hasConsent}`);
        } //end if hasConsent
      }) //end then

      .catch(reason => {
        console.error(
          `Something went wrong when reading the state for ${PLUGIN_ID}.\n${reason}`
        );
      });

    const { commands } = app;

    // Add a command
    const command = 'jlab-examples:main-menu';
    commands.addCommand(command, {
      label: 'Office Hours',
      caption: 'Execute jlab-examples:main-menu Command',
      execute: (args: any) => {
        console.log(
          `jlab-examples:main-menu has been called ${args['origin']}.`
        );
      }
    });
    const commandDocs = 'jlab-examples:main-menu:docs';
    commands.addCommand(commandDocs, {
      label: 'Docs',
      caption: 'Execute jlab-examples:main-menu Command',
      execute: (args: any) => {
        console.log(
          `jlab-examples:main-menu has been called ${args['origin']}.`
        );
      }
    });
    // Add the command to the command palette
    const category = 'Extension Examples';
    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' }
    });

  } //end activate
}; //end const plugin

export default plugin;