import React, {useState, useEffect} from 'react';
import { PanelProps } from '@grafana/data';
import axios from 'axios';
import { Button, InlineField, InlineFieldRow, InlineSwitch, Input } from '@grafana/ui';

type TagType = '0' | '1' | '2' | '3' | '4';
interface FieldData {
  tagId: string;
  tagType: TagType;
  curVal: number | string;
  changed: boolean;
}

export const ManualInputPanel: React.FC<PanelProps> = ({ options, id, data, width, height }) => {

  const [fieldData, setFieldData] = useState<FieldData>({ tagId: '', tagType: '0', curVal: 0, changed: false });

  const [inputState, setInputState] = useState<number>();
  const [switchState, setSwitchState] = useState<boolean>();

  useEffect(() => {
    if (data.series[0].fields[1]) {
      setFieldData({...fieldData, curVal: data.series[0].fields[1].values.get(data.series[0].fields[1].values.length-1)})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldData.curVal, data]);

  function updateChecked() {
      console.log(fieldData)
      setFieldData({ ...fieldData, changed: true });
      console.log(fieldData)
  }

  const sendNewTagData = (newTagData: number) => {
    axios({
      method: 'POST',
      url: options.peresvetUrl,
      data: {
        data: [
          {
            tagId: options.tagId,
            data: [[newTagData]],
          },
        ],
      },
    })
      .then((resp) => {
        console.log(resp)
        setFieldData({ ...fieldData, curVal: newTagData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  switch (options.inputType) {
    case 'field':
      return (
        <div style={{ border: fieldData.changed ? '2px solid rgb(61, 113, 217)' : 'rgb(42, 42, 60)' }}>
          <Input
            addonBefore={fieldData.tagId}
            placeholder={fieldData.curVal ? fieldData.curVal.toString() : "no value"}
            value={inputState}
            onChange={(e) => {
              setInputState(parseInt(e.currentTarget.value, 10));
            }}
            addonAfter={
              <Button
                onClick={(e) => {
                  updateChecked();
                  sendNewTagData(inputState);
                }}
              >
                Send
              </Button>
            }
          />
        </div>
      );
    case 'icon':
      return (
        <div
          style={{
            width: 'fit-content',
            border: fieldData.changed ? '2px solid rgb(61, 113, 217)' : 'rgb(42, 42, 60)',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <InlineFieldRow>
              <InlineField label={ options.tagId }>
                <InlineSwitch
                value={switchState}
                onChange={(e) => {
                  updateChecked()
                  setSwitchState(!switchState)
                  sendNewTagData(switchState ? 0 : 1)  
            }}/>
              </InlineField>
            </InlineFieldRow>
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
