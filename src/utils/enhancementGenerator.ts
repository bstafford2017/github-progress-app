import { Enhancement } from '../components/EnhancementSuggestions';

export const generateContextualEnhancements = (taskName: string, taskDescription?: string): Enhancement[] => {
  const taskLower = taskName.toLowerCase();

  // Category-based enhancement suggestions
  const enhancements: Record<string, Enhancement[]> = {
    // Development tasks
    'code': [
      {
        id: 1,
        title: 'Add Code Review Checklist',
        description: 'Create a comprehensive checklist for code quality, security, and performance',
        effort: 'low',
      },
      {
        id: 2,
        title: 'Set Up Automated Testing',
        description: 'Configure pre-commit hooks and CI/CD pipelines for automatic validation',
        effort: 'high',
      },
      {
        id: 3,
        title: 'Document Code Changes',
        description: 'Generate API documentation and update README with implementation details',
        effort: 'medium',
      },
    ],
    'test': [
      {
        id: 1,
        title: 'Increase Test Coverage',
        description: 'Add edge case tests and integration tests to reach 90%+ coverage',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Performance Benchmarking',
        description: 'Create benchmarks to measure test execution time and optimize slow tests',
        effort: 'medium',
      },
      {
        id: 3,
        title: 'Test Report Dashboard',
        description: 'Set up continuous test reporting with trends and failure analysis',
        effort: 'high',
      },
    ],
    'deploy': [
      {
        id: 1,
        title: 'Blue-Green Deployment',
        description: 'Implement zero-downtime deployments with automatic rollback',
        effort: 'high',
      },
      {
        id: 2,
        title: 'Deployment Monitoring',
        description: 'Add real-time monitoring and alerting for post-deployment health checks',
        effort: 'medium',
      },
      {
        id: 3,
        title: 'Canary Releases',
        description: 'Gradually roll out changes to a subset of users before full deployment',
        effort: 'high',
      },
    ],
    'security': [
      {
        id: 1,
        title: 'Security Audit',
        description: 'Perform comprehensive security scanning and vulnerability assessment',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Implement OWASP Guidelines',
        description: 'Apply OWASP Top 10 protections and security best practices',
        effort: 'high',
      },
      {
        id: 3,
        title: 'Secrets Management',
        description: 'Implement secure credential rotation and secrets management system',
        effort: 'medium',
      },
    ],
    'database': [
      {
        id: 1,
        title: 'Query Optimization',
        description: 'Analyze and optimize slow queries, add appropriate indexes',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Backup & Recovery',
        description: 'Set up automated backups with tested recovery procedures',
        effort: 'high',
      },
      {
        id: 3,
        title: 'Database Monitoring',
        description: 'Implement monitoring for performance metrics and anomalies',
        effort: 'medium',
      },
    ],
    'infrastructure': [
      {
        id: 1,
        title: 'Infrastructure as Code Review',
        description: 'Audit IaC for best practices, security, and cost optimization',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Disaster Recovery Plan',
        description: 'Create and test comprehensive disaster recovery procedures',
        effort: 'high',
      },
      {
        id: 3,
        title: 'Cost Optimization',
        description: 'Analyze resource usage and identify cost-saving opportunities',
        effort: 'medium',
      },
    ],
    'performance': [
      {
        id: 1,
        title: 'Profiling & Analysis',
        description: 'Profile application with tools like perf, Lighthouse, or New Relic',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Caching Strategy',
        description: 'Implement multi-level caching (HTTP, application, database)',
        effort: 'high',
      },
      {
        id: 3,
        title: 'Load Testing',
        description: 'Execute stress tests and load tests to identify bottlenecks',
        effort: 'medium',
      },
    ],
    'documentation': [
      {
        id: 1,
        title: 'API Documentation',
        description: 'Generate interactive API docs with Swagger/OpenAPI and examples',
        effort: 'low',
      },
      {
        id: 2,
        title: 'Architecture Decision Records',
        description: 'Document key architectural decisions and rationale',
        effort: 'medium',
      },
      {
        id: 3,
        title: 'Runbooks & Playbooks',
        description: 'Create operational playbooks for common tasks and incidents',
        effort: 'medium',
      },
    ],
    'bug': [
      {
        id: 1,
        title: 'Root Cause Analysis',
        description: 'Conduct thorough RCA to prevent similar bugs in future',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Add Regression Tests',
        description: 'Create tests to prevent this bug from reoccurring',
        effort: 'low',
      },
      {
        id: 3,
        title: 'Error Tracking Integration',
        description: 'Set up error tracking (Sentry/LogRocket) to catch similar issues',
        effort: 'medium',
      },
    ],
    'feature': [
      {
        id: 1,
        title: 'Feature Flag Implementation',
        description: 'Add feature flags for gradual rollout and A/B testing',
        effort: 'medium',
      },
      {
        id: 2,
        title: 'Analytics Integration',
        description: 'Track feature usage and user engagement metrics',
        effort: 'low',
      },
      {
        id: 3,
        title: 'User Feedback Loop',
        description: 'Set up feedback collection and monitoring for user satisfaction',
        effort: 'low',
      },
    ],
  };

  // Find matching category
  for (const [key, suggestions] of Object.entries(enhancements)) {
    if (taskLower.includes(key)) {
      return suggestions;
    }
  }

  // Default suggestions
  return [
    {
      id: 1,
      title: 'Automate Repetitive Steps',
      description: 'Create scripts or workflows to reduce manual effort and human error',
      effort: 'medium',
    },
    {
      id: 2,
      title: 'Add Comprehensive Logging',
      description: 'Implement detailed logging for debugging and monitoring',
      effort: 'low',
    },
    {
      id: 3,
      title: 'Create Team Documentation',
      description: 'Document processes and decisions for team knowledge sharing',
      effort: 'medium',
    },
  ];
};
