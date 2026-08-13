/*
 * Copyright 2025 The Kubernetes Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ThemeProvider } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { createMuiTheme } from '../../lib/themes';
import { TestContext } from '../../test';
import SimpleTable from './SimpleTable';

describe('SimpleTable', () => {
  it('renders data using getter functions returning ReactNodes', () => {
    const columns = [
      {
        label: 'Name',
        getter: (item: { name: string }) => <strong>{item.name}</strong>,
      },
      {
        label: 'Status',
        getter: (item: { status: string }) => <span data-testid="status">{item.status}</span>,
      },
    ];

    const data = [
      { name: 'pod-1', status: 'Running' },
      { name: 'pod-2', status: 'Pending' },
    ];

    render(
      <TestContext>
        <ThemeProvider theme={createMuiTheme({ base: 'light', name: 'light' })}>
          <SimpleTable columns={columns} data={data} />
        </ThemeProvider>
      </TestContext>
    );

    expect(screen.getByText('pod-1')).toBeDefined();
    expect(screen.getByText('pod-2')).toBeDefined();
    expect(screen.getByText('Running')).toBeDefined();
    expect(screen.getByText('Pending')).toBeDefined();
  });
});
