import React from 'react';
import { ToolTip } from '~/components';
import { useAccessToken, useGlobalContext } from '~/globalContext';
import { testGetFetch, testPostFetch } from '~/http/apis/test';

export const PageDashboard: React.FC = () => {
  const { setAccessToken, removeAccessToken } = useGlobalContext();
  const accessToken = useAccessToken();
  console.log(accessToken, 'token');
  return (
    <React.Fragment>
      <button
        onClick={() => {
          setAccessToken('new token');
        }}
      >
        更新token
      </button>
      <button
        onClick={() => {
          removeAccessToken();
        }}
      >
        删除token
      </button>
      <button
        onClick={() => {
          testGetFetch().then((res) => console.log('getfetch',res));
        }}
      >
        getfetch
      </button>
      <button
        onClick={() => {
          testPostFetch()
            .then((res) => console.log('postfetch',res))
            .catch((e) => console.log(e));
        }}
      >
        postfetch
      </button>
      <div style={{ marginLeft: '50px', marginTop: '50px' }}>
        <ToolTip
          arrow={true}
          content={
            <div
              style={{
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                color: '#bca2e6',
              }}
            >
              <div onClick={()=>{console.log('编辑')}}>编辑</div>
              <div onClick={()=>{console.log('删除')}}>删除</div>
              <div onClick={()=>{console.log('刷新')}}>刷新</div>
            </div>
          }
          trigger="click"
        >
          <div>tip</div>
        </ToolTip>
      </div>
    </React.Fragment>
  );
};
export default PageDashboard;
