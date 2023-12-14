import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { ManualInputPanel } from './FormPanel';

export const plugin = new PanelPlugin<SimpleOptions>(ManualInputPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'peresvetUrl',
      name: 'URL',
      defaultValue: 'http://localhost/v1/data/',
    })
    .addRadio({
      path: 'inputType',
      name: 'Тип ввода',
      defaultValue: 'field',
      settings: {
        options: [
          {
            value: 'field',
            label: 'Поле',
          },
          {
            value: 'icon',
            label: 'Значок',
          },
        ],
      },
    })
    .addTextInput({
      path: 'tagId',
      name: 'Id тега',
    });
});
