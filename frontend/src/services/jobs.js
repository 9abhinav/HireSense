import api from './api';

export const jobsService = {
  matchJob: (jobDescription, resumeId) =>
    api.post('/jobs/match', { jobDescription, resumeId }),

  getMatches: () =>
    api.get('/jobs/matches'),

  getMatchDetails: (matchId) =>
    api.get(`/jobs/matches/${matchId}`)
};
