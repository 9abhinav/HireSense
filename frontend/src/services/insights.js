import api from './api';

export const insightsService = {
  getCareerInsights: () =>
    api.get('/insights/career'),

  getSkillRecommendations: () =>
    api.get('/insights/skills'),

  getTrajectory: () =>
    api.get('/insights/trajectory')
};
