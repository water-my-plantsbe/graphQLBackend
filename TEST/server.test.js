const request = require('supertest');
const server = require('../api/server.js');


describe('server.js', () => {
  describe('GET to / endpoint', () => {
    it('should return a status code of 200', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
   
  });
  
});
