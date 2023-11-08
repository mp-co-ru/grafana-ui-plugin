import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { BasicFormPanel } from './FormPanel';

export const plugin = new PanelPlugin<SimpleOptions>(BasicFormPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'peresvetUrl',
      name: 'Url to connect to Peresvet platform',
    })
    .addRadio({
      path: 'inputType',
      name: 'Input type',
      defaultValue: 'field',
      settings: {
        options: [
          {
            value: 'field',
            label: 'Field',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
        ],
      },
    })
    .addTextInput({
      path: 'tagId',
      name: 'Id of the Tag to connect to',
    });
});
