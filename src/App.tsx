/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Layout } from './components/Layout';
import { MapSection } from './components/MapSection';

export default function App() {
  // 
  // NOTE: The main application initialization logic has moved 
  // to the StageManager in src/lib/StageManager.ts, which is triggered 
  // by src/main.tsx.
  //

  return (
    <Layout>
      <MapSection />
    </Layout>
  );
}
