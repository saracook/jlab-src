import { ReactWidget } from '@jupyterlab/ui-components';

import React from 'react';

/**
 * React component for text with formatting
 *
 * @returns The React component
 */
const NistComponent = (): JSX.Element => {

return (
<>
<div className="stanford-boilerplate">
<p>Carina is designed for high risk data; you still must comply with all applicable Stanford policies for high risk data.</p>

<p>This system is for authorized users only and users must comply with all
Stanford computing, network and research policies. </p>
<p>All activity may be
recorded for security and monitoring purposes. </p>
<p>
<a href="https://doresearch.stanford.edu/policies/research-policy-handbook" target="_new">Research Policy Handbook</a></p> 
<p><a href="https://adminguide.stanford.edu/chapters/computing/computer-and-network-usage/computer-and-network-usage-policy" target="_new">Computer and Network Usage Policy</a>
</p></div>
  </>
  );
};

/**
 * A Lumino Widget that wraps a NistComponent.
 */
export class NistWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-react-widget');
  }

  render(): JSX.Element {
    return <NistComponent />;
  }
}
