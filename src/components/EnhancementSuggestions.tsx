import React from 'react';

export interface Enhancement {
  id: number;
  title: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
}

interface EnhancementSuggestionsProps {
  taskName: string;
  suggestions: Enhancement[];
}

export const EnhancementSuggestions: React.FC<EnhancementSuggestionsProps> = ({
  taskName,
  suggestions,
}) => {
  return (
    <div className="enhancement-suggestions">
      <h3 className="enhancement-title">Enhancement Suggestions for: {taskName}</h3>
      <div className="suggestions-grid">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="suggestion-card">
            <div className="suggestion-header">
              <h4>{suggestion.title}</h4>
              <span className={`effort-badge effort-${suggestion.effort}`}>
                {suggestion.effort.toUpperCase()}
              </span>
            </div>
            <p className="suggestion-description">{suggestion.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const generateEnhancements = (taskName: string): Enhancement[] => {
  const enhancementMap: Record<string, Enhancement[]> = {
    default: [
      {
        id: 1,
        title: 'Add Automation',
        description: 'Create a script or workflow to automate repetitive steps in this task',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Performance Optimization',
        description: 'Profile and optimize the task for speed and efficiency',
        effort: 'medium',
      },
      {
        id: 3,
        title: 'Enhanced Error Handling',
        description: 'Add comprehensive error handling and recovery mechanisms',
        effort: 'low',
      },
    ],
  };

  return enhancementMap[taskName.toLowerCase()] || enhancementMap.default;
};
