import api from './api';

export const resumeService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  analyze: (resumeId) =>
    api.post(`/resume/${resumeId}/analyze`),

  getAnalysis: (resumeId) =>
    api.get(`/resume/${resumeId}/analysis`),

  getVersions: () =>
    api.get('/resume/versions'),

  createVersion: (data) =>
    api.post('/resume/versions', data),

  deleteVersion: (versionId) =>
    api.delete(`/resume/versions/${versionId}`),

  duplicateVersion: (versionId) =>
    api.post(`/resume/versions/${versionId}/duplicate`)
};
