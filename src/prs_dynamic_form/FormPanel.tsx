import React, {useState, useEffect} from 'react';
import { PanelProps } from '@grafana/data';
import axios from 'axios';
import { Button, IconButton, Input } from '@grafana/ui';

type TagType = '0' | '1' | '2' | '3' | '4';
interface FieldData {
  tagId: string;
  tagType: TagType;
  curVal: number | string;
  changed: boolean;
}

export const BasicFormPanel: React.FC<PanelProps> = ({ options, id, data, width, height }) => {
  console.log(options);

  const [fieldData, setFieldData] = useState<FieldData>({ tagId: '', tagType: '0', curVal: 0, changed: false });

  const [inputState, setInputState] = useState<string>();

  const get_tag_data = () => {
    axios({
      method: 'get',
      url: options.peresvetUrl,
      data: { tagId: options.tagId },
    })
      .then((value) => {
        const tagData = value.data.data[0].data[0][0];
        setFieldData({ ...fieldData, curVal: tagData });
      })
      .catch(() => {
        console.log('Error');
      });
  };

  useEffect(() => {
    get_tag_data();
    setInputState(fieldData.curVal.toString());
    console.log('Init fired');
  }, []);

  function updateChecked() {
    if (!fieldData.changed) {
      setFieldData({ ...fieldData, changed: !fieldData.changed });
      console.log('UpdateChecked', fieldData.changed);
      // console.log(fieldData.changed);
    }
  }

  const sendNewTagData = (newTagData: number | string) => {
    axios({
      method: 'post',
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
      .then(() => {
        setFieldData({ ...fieldData, curVal: newTagData });
      })
      .catch(() => {
        console.log('Error');
      });
  };

  switch (options.inputType) {
    case 'field':
      return (
        <div style={{ border: fieldData.changed ? '2px solid rgb(61, 113, 217)' : 'rgb(42, 42, 60)' }}>
          <Input
            addonBefore={fieldData.tagId}
            placeholder={fieldData.curVal.toString()}
            value={inputState}
            onChange={(e) => {
              setInputState(e.currentTarget.value);
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
            borderRadius: '50%',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            padding: '0.2rem',
          }}
        >
          <IconButton
            style={{ margin: '0' }}
            name="bolt"
            size="xxxl"
            onClick={() => {
              updateChecked();
            }}
          ></IconButton>
        </div>
      );
    default:
      return <></>;
  }
};
