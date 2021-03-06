import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { Flex } = requireComponent('workflow-layout-yoga');
const { Browser } = requireComponent('workflow-apps-defaults');

export const flow = render(
  <Workspace name={'workflow-yoga-example'}>
    <Flex
      name="flex"
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Browser style={{ flex: 1, width: '80%', height: '80%' }} url={'https://yogalayout.com'} />
    </Flex>
  </Workspace>
);
