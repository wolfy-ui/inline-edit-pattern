import React, { useState } from 'react';
import EditableMultiLineTextComponent, { DebugHeights } from './EditableMultiLineText.tsx';

const EditableDescription = () => {
  const [text, setText] = useState('Dies ist ein Testtext für die EditableMultiLineText Komponente. Er enthält mehrere Zeilen, damit wir das Verhalten der Komponente gut testen können. Die Textarea sollte initial die gleiche Höhe haben wie dieser Text, kann danach aber frei angepasst werden.');
  const [debugHeights, setDebugHeights] = useState<DebugHeights>({
    textSpan: 0,
    textarea: 0,
    scroll: 0
  });

  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <h2 className="text-xl">EditableMultiLineText Vorschau</h2>

      {/* Test mit dem Text */}
      <div>
        <EditableMultiLineTextComponent
          value={text}
          onUpdate={setText}
          onHeightChange={setDebugHeights}
          className="text-gray-600"
        />
      </div>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded space-y-2 text-sm">
        <div>Aktueller Text:</div>
        <div className="font-mono break-all mb-4">{text}</div>
        <div>Debug Heights:</div>
        <pre className="text-xs">
          Text Span: {debugHeights.textSpan}px{'\n'}
          Textarea: {debugHeights.textarea}px{'\n'}
          ScrollHeight: {debugHeights.scroll}px{'\n'}
        </pre>
      </div>
    </div>
  );
};

export default EditableDescription;