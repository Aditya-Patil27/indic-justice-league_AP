import React, { useMemo } from "react";

const DiffView = ({ analysis, firText, witnessText }) => {
  const diffResults = useMemo(() => {
    // Simple diff algorithm - compare line by line
    const firLines = firText.split("\n");
    const witnessLines = witnessText.split("\n");

    const diffs = [];
    const maxLength = Math.max(firLines.length, witnessLines.length);

    for (let i = 0; i < maxLength; i++) {
      const firLine = firLines[i] || "";
      const witnessLine = witnessLines[i] || "";

      if (firLine !== witnessLine) {
        diffs.push({
          lineNumber: i + 1,
          firText: firLine,
          witnessText: witnessLine,
          isSame: false,
        });
      } else if (firLine) {
        diffs.push({
          lineNumber: i + 1,
          firText: firLine,
          witnessText: witnessLine,
          isSame: true,
        });
      }
    }

    return diffs;
  }, [firText, witnessText]);

  return (
    <div className="bg-white rounded shadow-lg">
      {/* Stats */}
      <div className="p-4 border-b grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Similarity Score</p>
          <p className="text-2xl font-bold">
            {(analysis?.similarity_score * 100 || 0).toFixed(1)}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Discrepancies Found</p>
          <p className="text-2xl font-bold">
            {analysis?.discrepancies?.length || 0}
          </p>
        </div>
      </div>

      {/* Diff View */}
      <div className="p-4 border-b">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">FIR Text</h3>
            <div className="bg-gray-50 p-2 rounded max-h-80 overflow-y-auto">
              {diffResults.map((diff, index) => (
                <div
                  key={index}
                  className={`p-1 text-sm ${
                    diff.isSame ? "" : "bg-red-100"
                  }`}
                >
                  <span className="text-gray-500 inline-block w-8">
                    {diff.lineNumber}
                  </span>
                  <span>{diff.firText || <em className="text-gray-400">empty</em>}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Witness Statement Text</h3>
            <div className="bg-gray-50 p-2 rounded max-h-80 overflow-y-auto">
              {diffResults.map((diff, index) => (
                <div
                  key={index}
                  className={`p-1 text-sm ${
                    diff.isSame ? "" : "bg-green-100"
                  }`}
                >
                  <span className="text-gray-500 inline-block w-8">
                    {diff.lineNumber}
                  </span>
                  <span>{diff.witnessText || <em className="text-gray-400">empty</em>}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discrepancies */}
      {analysis?.discrepancies?.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-2">Identified Discrepancies</h3>
          <ul className="space-y-2">
            {analysis.discrepancies.map((disc, index) => (
              <li key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                {disc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {analysis?.recommendations?.length > 0 && (
        <div className="p-4">
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="p-2 bg-blue-50 border border-blue-200 rounded">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DiffView;
