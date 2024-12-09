import React, { useState } from 'react';

interface EditableFieldProps {
  value: string;
  onUpdate: (value: string) => void;
  editable?: boolean;
  type?: 'text' | 'number' | 'date';
  className?: string;
  multiline?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ 
    value, 
    onUpdate, 
    editable = true,
    type = 'text',
    className = '',
    multiline = false
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const [elementHeight, setElementHeight] = useState('auto');

    // Gradient Animation CSS
    React.useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes gradientSlide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-gradient {
          background: linear-gradient(90deg, rgb(229 231 235), rgb(75 85 99), rgb(229 231 235));
          background-size: 200% 100%;
          animation: gradientSlide 3s linear infinite;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, []);

    const handleClick = () => {
      if (elementRef.current && multiline) {
        // Berechne die Höhe ohne Border
        const computedStyle = window.getComputedStyle(elementRef.current);
        const height = elementRef.current.offsetHeight - 
                      parseInt(computedStyle.borderBottomWidth, 10);
        setElementHeight(`${height}px`);
      }
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      if (currentValue !== value) {
        onUpdate(currentValue);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !multiline) {
        handleBlur();
      }
      if (e.key === 'Escape') {
        setCurrentValue(value);
        setIsEditing(false);
      }
    };

    if (!editable) {
      return (
        <span className={`py-2 block border-b border-gray-200 ${className}`}>
          {value}
        </span>
      );
    }

    if (isEditing) {
      const fontClasses = className.split(' ').filter(cls => 
        cls.startsWith('text-') || cls.startsWith('font-')
      ).join(' ');

      if (multiline) {
        return (
          <textarea
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent outline-none py-2 border-b border-black ${fontClasses}`}
            style={{ 
              minHeight: elementHeight,
              height: elementHeight,
              resize: 'vertical',
            }}
            autoFocus
          />
        );
      }
      return (
        <input
          type={type}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent outline-none py-2 border-b border-black ${fontClasses}`}
          style={{ 
            fontFamily: 'inherit'
          }}
          autoFocus
        />
      );
    }

    const isTitleOrDesc = className.includes('text-2xl') || className.includes('text-gray-600');
    
    return (
      <div
        ref={elementRef}
        onClick={handleClick}
        className={`relative group ${className}`}
      >
        <span className={`block py-2 cursor-text ${isTitleOrDesc ? 'border-b border-transparent' : 'border-b border-gray-200'}`}>
          {value}
        </span>
        <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100">
          <div className="w-full h-full animate-gradient" />
        </div>
      </div>
    );
  };

const InlineEditPattern = () => {
  const [content, setContent] = useState({
    title: 'Projektübersicht Q1 2024',
    description: 'Statusbericht und Fortschrittsverfolgung aller aktiven Komponenten im ersten Quartal 2024. Dieser Bericht umfasst die Entwicklung und Implementation neuer UI-Patterns, die Optimierung bestehender Komponenten sowie die Integration von Feedback aus der letzten Nutzerevaluation. Besonderes Augenmerk liegt auf der Verbesserung der Benutzerfreundlichkeit und der Performance kritischer Systemkomponenten.',
    tableData: [
      { label: 'Projekt', value: 'UI Redesign', editable: true },
      { label: 'Status', value: 'In Bearbeitung', editable: true },
      { label: 'Priorität', value: 'Hoch', editable: true },
      { label: 'Erstellt am', value: '2024-03-30', editable: false }
    ],
    gridData: [
      { 
        id: 1, 
        name: 'Komponente A', 
        status: 'Aktiv', 
        progress: '75', 
        assignee: 'Anna Schmidt', 
        lastUpdated: '2024-03-10' 
      },
      { 
        id: 2, 
        name: 'Komponente B', 
        status: 'In Review', 
        progress: '90', 
        assignee: 'Thomas Müller', 
        lastUpdated: '2024-03-12' 
      },
      { 
        id: 3, 
        name: 'Komponente C', 
        status: 'Geplant', 
        progress: '0', 
        assignee: 'Lisa Weber', 
        lastUpdated: '2024-03-15' 
      }
    ]
  });

  const updateField = (field, value) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateTableData = (index, value) => {
    setContent(prev => ({
      ...prev,
      tableData: prev.tableData.map((item, i) => 
        i === index ? { ...item, value } : item
      )
    }));
  };

  const updateGridData = (id, field, value) => {
    setContent(prev => ({
      ...prev,
      gridData: prev.gridData.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Header Bereich */}
      <div>
        <div className="mb-4">
          <EditableField
            value={content.title}
            onUpdate={(value) => updateField('title', value)}
            className="text-2xl font-semibold"
          />
        </div>
        <EditableField
          value={content.description}
          onUpdate={(value) => updateField('description', value)}
          className="text-gray-600"
          multiline={true}
        />
      </div>

      {/* Einfache tabellarische Ansicht */}
      <div>
        <h2 className="text-xl font-medium mb-6">Projektstatus</h2>
        <div>
          <table className="w-full border-separate" style={{ borderSpacing: '16px 0', margin: '0 -16px' }}>
            <tbody>
              {content.tableData.map((row, index) => (
                <tr key={row.label}>
                  <td className="w-1/4">
                    <span className="block py-2 text-sm text-gray-600 border-b border-gray-200">
                      {row.label}
                    </span>
                  </td>
                  <td>
                    <EditableField
                      value={row.value}
                      onUpdate={(value) => updateTableData(index, value)}
                      editable={row.editable}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Komplexe Datentabelle */}
      <div>
        <h2 className="text-xl font-medium mb-6">Komponentenübersicht</h2>
        <div>
          <table className="w-full border-separate" style={{ borderSpacing: '16px 0', margin: '0 -16px' }}>
            <colgroup>
              <col style={{width: '25%'}} />
              <col style={{width: '15%'}} />
              <col style={{width: '15%'}} />
              <col style={{width: '25%'}} />
              <col style={{width: '20%'}} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left text-sm font-normal text-gray-600 pb-2">Name</th>
                <th className="text-left text-sm font-normal text-gray-600 pb-2">Status</th>
                <th className="text-left text-sm font-normal text-gray-600 pb-2">Fortschritt</th>
                <th className="text-left text-sm font-normal text-gray-600 pb-2">Zugewiesen</th>
                <th className="text-left text-sm font-normal text-gray-600 pb-2">Letzte Änderung</th>
              </tr>
            </thead>
            <tbody>
              {content.gridData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <EditableField
                      value={row.name}
                      onUpdate={(value) => updateGridData(row.id, 'name', value)}
                    />
                  </td>
                  <td>
                    <EditableField
                      value={row.status}
                      onUpdate={(value) => updateGridData(row.id, 'status', value)}
                    />
                  </td>
                  <td>
                    <EditableField
                      value={row.progress}
                      onUpdate={(value) => updateGridData(row.id, 'progress', value)}
                      type="number"
                    />
                  </td>
                  <td>
                    <EditableField
                      value={row.assignee}
                      onUpdate={(value) => updateGridData(row.id, 'assignee', value)}
                    />
                  </td>
                  <td>
                    <EditableField
                      value={row.lastUpdated}
                      onUpdate={(value) => updateGridData(row.id, 'lastUpdated', value)}
                      type="date"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InlineEditPattern;