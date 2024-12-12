import React from 'react';

const TextOutput: React.FC = () => {
  return (
    <div className="mt-12 py-6 bg-gray-50 rounded-lg">
      <div className="border-b border-gray-300 mb-6"></div>
      <h2 className="text-m font-regular mb-6">Rational</h2>
      <h2 className="text-xl font-medium mb-6">Verbesserte Inline-Editing-Strategie</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium mb-4">1. Lesbarkeit sicherstellen (Objective A)</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex gap-4">
              <span className="font-medium w-6">a)</span>
              <span><span className="font-medium">Typografie:</span> Eine klare und gut lesbare Typografie strukturiert die Inhalte und verbessert die visuelle Hierarchie. Sie lenkt den Blick des Nutzers auf die wichtigsten Elemente und trägt dazu bei, dass die Inhalte wie eine Anzeigeseite wahrgenommen werden. Dies wird durch den Einsatz geeigneter Schriftarten und großzügiger Abstände erreicht.</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">b)</span>
              <span><span className="font-medium">Hover-Indikatoren:</span> Bearbeitungsmöglichkeiten werden erst durch Hover-Effekte oder dezente Symbole sichtbar gemacht. Dadurch bleibt der Lesefluss ungestört.</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">c)</span>
              <span><span className="font-medium">Farbwahl:</span> Dezente Farben für Bearbeitungselemente fügen sich harmonisch ins Gesamtbild ein und erhalten die Lesbarkeit der Inhalte.</span>
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4">2. Nahtloses Editieren ermöglichen (Objective B)</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex gap-4">
              <span className="font-medium w-6">a)</span>
              <span><span className="font-medium">Direkt anklickbare Felder:</span> Felder wechseln durch einen Klick in den Bearbeitungsmodus, ohne dass ein expliziter "Edit"-Button nötig ist.</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">b)</span>
              <span><span className="font-medium">Bearbeitungsmodus begrenzen:</span> Im Bearbeitungsmodus sollte nur das ausgewählte Feld hervorgehoben sein, während der Rest der Seite unverändert bleibt.</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">c)</span>
              <span><span className="font-medium">Speichern durch Fokusverlust:</span> Änderungen werden automatisch gespeichert, sobald der Fokus das Feld verlässt, um den Workflow zu beschleunigen.</span>
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4">3. Vermeidung von Formularoptik (Objective C)</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex gap-4">
              <span className="font-medium w-6">a)</span>
              <span><span className="font-medium">Keine standardmäßigen Input-Felder:</span> Stilistisch gestaltete Container wirken im Normalzustand wie Text und ändern sich nur subtil bei Aktivierung. Ein Beispiel hierfür ist eine Linie am unteren Rand des Containers, die im Bearbeitungsmodus angezeigt wird. Bei Hover erscheint diese Linie ebenfalls, allerdings dezenter und mit einer subtilen Animation, um die Editierbarkeit hervorzuheben. Diese Linie trägt zur Adaptive Formatierung bei, da der Übergang zwischen Anzeigemodus und Bearbeitungsmodus subtil gestaltet ist. Das Design bleibt einheitlich, und visuelle Unterschiede wie die Linie oder dezente Animationen werden gezielt eingesetzt, um den Bearbeitungszustand zu kennzeichnen, ohne das Gesamtbild zu stören.</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">b)</span>
              <span><span className="font-medium">Interaktive Icons:</span> Elemente wie Dropdowns oder Checkboxen werden durch Icons ergänzt, die nur bei Aktivierung erscheinen, um eine elegante Bedienung zu ermöglichen.</span>
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-4">4. Strukturierte und vorformatierte Felder (Objective D)</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex gap-4">
              <span className="font-medium w-6">a)</span>
              <span><span className="font-medium">Feld-Typen klar definieren:</span> Unterschiedliche Feldarten (z. B. Titel, Beschreibung, Tags) sind visuell und funktional unterscheidbar, bleiben jedoch konsistent.</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">b)</span>
              <span><span className="font-medium">Placeholder-Texte nutzen:</span> Hinweise zur erwarteten Eingabe werden als Platzhalter angezeigt (z. B. „Titel hinzufügen").</span>
            </p>
            <p className="flex gap-4">
              <span className="font-medium w-6">c)</span>
              <span><span className="font-medium">Regeln für Eingaben:</span> Klare Vorgaben wie Zeichenanzahl oder Format stellen Einheitlichkeit und Qualität der Inhalte sicher.</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TextOutput; 