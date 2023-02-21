import React from 'react';
import { Button, Button2, CheckBox } from '~/components';
import reset from '~/components/component-button-2/reset.svg';

export const PageDashboard: React.FC = () => {
  return (
    <React.Fragment>
      <Button>111</Button>
      <Button2
        startIcon={<img src={reset} alt="" className="w-5 h-5" />}
        className="mb-2"
        onClick={() => {
          console.log('11111');
        }}
      >
        重置搜索
      </Button2>
      <Button2 className="mb-2" theme="text">
        重置搜索
      </Button2>
      <hr />
      <Button2
        className="m-10 w-64"
        theme="primary"
        startIcon={<img src={reset} alt="" className="w-5 h-5" />}
      >
        重置搜索
      </Button2>
      <hr />
      <Button2 className="mb-2" theme="contained">
        重置搜索
      </Button2>
      <hr />
      <Button2 className="m-10" theme="primary" color="green">
        重置搜索
      </Button2>
      <Button2 className="mb-2" theme="contained" color="green">
        重置搜索
      </Button2>
      <Button2 className="mb-2" theme="contained" color="delete">
        重置搜索
      </Button2>
      {/* <Button2 className="mb-2" theme="primary">
        重置搜索
      </Button2>
      <Button2 className="mb-2" theme="text">
        重置搜索
      </Button2>
      <Button2 className="mb-2" theme="contained">
        重置搜索
      </Button2>
      <Button2 className="mb-2" theme="outlined">
        重置搜索
      </Button2> */}
      <br />
      {/* <Button2 size="small">重置搜索</Button2>
      <Button2>重置搜索</Button2>
      <Button2 size="large">重置搜索</Button2> */}
      <br />
      {/* <Button2 theme="contained" color="delete">
        重置搜索
      </Button2> */}
    </React.Fragment>
  );
};

export default PageDashboard;
