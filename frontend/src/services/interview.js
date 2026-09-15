import api from './api';

export const interviewService = {
  startSession: (config) =>
    api.post('/interview/start', config),

  getQuestion: (sessionId) =>
    api.get(`/interview/${sessionId}/question`),

  submitAnswer: (sessionId, questionId, answer) =>
    api.post(`/interview/${sessionId}/answer`, { questionId, answer }),

  endSession: (sessionId) =>
    api.post(`/interview/${sessionId}/end`),

  getResults: (sessionId) =>
    api.get(`/interview/${sessionId}/results`),

  getSessions: () =>
    api.get('/interview/sessions')
};
