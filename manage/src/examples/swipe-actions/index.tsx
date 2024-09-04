import { ComponentProps } from 'react';
import { SwipeActions } from '~/components';
import './index.css';

/** 不能丝滑滑动 */
export const SwipeActionsDemoChat = () => {
  return (
    <SwipeActions.Root className="chat-demo">
      <SwipeActions.Trigger className="demo-trigger">
        <div className="avatar">
          <Avatar />
        </div>
        <div className="info">
          <div className="title">
            <div className="name">Alice</div>
            <div className="time">16:25</div>
          </div>
          <div className="message">About your car extended warranty</div>
        </div>
      </SwipeActions.Trigger>
      <SwipeActions.Actions wrapperClassName="demo-actions-wrapper">
        <SwipeActions.Action
          className="demo-action"
          style={{ ['--color' as any]: '#ffe8e8' }}
        >
          {/* <HiTrash /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16">
            <path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0M6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM9.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5" />
          </svg>
          <div>Delete</div>
        </SwipeActions.Action>
        <SwipeActions.Action
          className="demo-action"
          style={{ ['--color' as any]: '#e8fff3' }}
        >
          {/* <HiStar /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16">
            <path fill="currentColor" d="M6.886.773C7.29-.231 8.71-.231 9.114.773l1.472 3.667l3.943.268c1.08.073 1.518 1.424.688 2.118L12.185 9.36l.964 3.832c.264 1.05-.886 1.884-1.802 1.31L8 12.4l-3.347 2.101c-.916.575-2.066-.26-1.802-1.309l.964-3.832L.783 6.826c-.83-.694-.391-2.045.688-2.118l3.943-.268z" />
          </svg>
          <div>Bookmark</div>
        </SwipeActions.Action>
        <SwipeActions.Action
          className="demo-action"
          style={{ ['--color' as any]: '#e6f0ff' }}
        >
          {/* <HiEnvelopeOpen /> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16">
            <path fill="currentColor" d="M7.732 1.078a.5.5 0 0 1 .536 0l4.806 3.058a2 2 0 0 1 .843 1.118L8 8.432L2.086 5.244a2 2 0 0 1 .84-1.108zM2 6.334V11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.344L8.237 9.44a.5.5 0 0 1-.474 0z" />
          </svg>
          <div>Read</div>
        </SwipeActions.Action>
      </SwipeActions.Actions>
    </SwipeActions.Root>
  );
};

const Avatar = (props: ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    fill="#000"
    data-name="Layer 1"
    viewBox="50 50 266.34 266.34"
    {...props}
  >
    <g id="SVGRepo_iconCarrier">
      <defs>
        <style>
          {
            '.cls-1{fill:#00214e}.cls-2{fill:#e18477}.cls-3{fill:#a76962}.cls-5{fill:none;stroke:#00214e;stroke-miterlimit:10}'
          }
        </style>
      </defs>
      <title>{'Artboards_Diversity_Avatars_by_Netguru'}</title>
      <path
        d="M218.31 54.07c-12-4-24.85-7.28-37.54-5.85a115 115 0 0 0-55.55 22C93.33 94 85.13 137 71.81 172.53c-5 13.33-10 26.79-12.17 40.87-6.32 41.77 21.57 56.83 57.72 67.09 45.55 12.93 95.4 9.07 139.81-6.53 37.83-13.29 53-45.33 45-83.6-4-18.88-11.54-36.8-19.14-54.55-14.46-33.68-28.13-69.39-64.72-81.74Z"
        className="cls-1"
      />
      <path
        d="M307.6 280.15a184.58 184.58 0 0 1-226.48-1l48.66-22.81a47.68 47.68 0 0 0 4.35-2.34l1.12-.7c.4-.25.79-.51 1.18-.78A46.54 46.54 0 0 0 151.1 236c4-7.55 5.32-15.88 5.38-24.38 0-5.73-.31-11.44-.37-17.18q-.06-4.75-.1-9.51l2 1 5.2 2.69 30.29 5.15 31.12 5.3.94 32L226 247l11.47 4.67 9 3.64Z"
        className="cls-2"
      />
      <path
        d="M225.51 227.76c-2.72 1.68-5.29 2.47-7.54 2.23-14.79-1.59-43.64-13.18-61.8-34.63q0-1.58-.06-3.15-.06-4.76-.1-9.51l2 1 5.2 2.69 30.29 5.15 31.12 5.3Z"
        className="cls-3"
      />
      <path
        d="M307.6 280.15a184.58 184.58 0 0 1-226.48-1l48.66-22.81q2.25-1.06 4.35-2.33c23.68 17.41 56.64 28.74 85.06 15.95 8.06-3.62 15.33-10 18.29-18.31l9 3.64Z"
        style={{
          fill: '#ff2609',
        }}
      />
      <circle cx={130.67} cy={152.96} r={17} className="cls-2" />
      <circle cx={137.67} cy={150.96} r={17} className="cls-3" />
      <path
        d="M217.67 217.09c-20.64 3.86-72-16.78-83.74-57.46a98.14 98.14 0 0 1-3.9-26.07c0-1.73 0-3.45.08-5.15 1.28-28.34 15.78-52 38.69-58.65 1.32-.38 2.65-.7 4-1a47.86 47.86 0 0 1 24 1.68 66.87 66.87 0 0 1 26.32 16.67 84.09 84.09 0 0 1 8.52 10 96.4 96.4 0 0 1 14.54 30.05c11.82 40.74-13.1 87.06-28.51 89.93Z"
        className="cls-2"
      />
      <path
        d="M213.32 128.89a58 58 0 0 0 2 11.49c1 3.31 2.52 5.36 4.52 8.22a17.7 17.7 0 0 1 1.79 3c2.65 5.94-.86 12.53-7.54 12.53H210M195.34 156.45a3.4 3.4 0 0 0 2.11 6.38M218.05 116.61a31.19 31.19 0 0 1 22.85-2.16M165.58 119.5a36.76 36.76 0 0 1 31.23-1"
        className="cls-5"
      />
      <path
        d="M210.21 64.69c-9.92-1.93-21.82-1.59-31.55-1.47-5.31.06-10.69.4-15.75 2-14 4.51-23.11 18-28.79 31.6-1.45 3.47-16.44 38-16.11 38.07 9.6 3.12 19.88-1.22 28.89-5.75 26.74-13.47 55.12-35.12 66.62-63.74-1.07-.24-2.18-.49-3.31-.71Z"
        className="cls-1"
      />
      <path
        d="M185 172.55a1.86 1.86 0 0 1 2.68-.5c2.08 1.46 5.88 4.56 11.28 5.64 7.36 1.46 13.75-1.48 15.27.41.86 1.07-.19 2.38-2.2 4.05a19.69 19.69 0 0 1-14.86 3.69c-7.08-1.33-12.4-9.53-12.4-12.43a1.72 1.72 0 0 1 .23-.86Z"
        style={{
          fill: '#fff',
        }}
      />
      <path
        d="M179.41 130.89c6.1.05 6.1 9.37 0 9.42h-.27c-6.1-.05-6.1-9.37 0-9.42h.27ZM229.67 130.23c5.67 0 5.67 8.7 0 8.74h-.25c-5.67 0-5.67-8.7 0-8.74h.25Z"
        className="cls-1"
      />
    </g>
  </svg>
);
