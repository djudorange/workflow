/* eslint-env node */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, Workspace, requireComponent } from 'workflow-react';

const { SplitH } = requireComponent('workflow-layout-tiled');
const { Terminal } = requireComponent('workflow-apps-defaults');

export const flow = render(
  <Workspace name={'term:split'}>
    <SplitH>
      <Terminal cwd={process.cwd()} percent={0.8} />
      <Terminal cwd={process.cwd()} percent={0.2} />
    </SplitH>
  </Workspace>
);
