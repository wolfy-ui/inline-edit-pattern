import React from 'react';
import InlineEditPattern from './inline-edit-pattern.tsx';
import EditableDescription from './preview.tsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InlineEditPattern />
      <EditableDescription />
    </div>
  );
}

export default App;