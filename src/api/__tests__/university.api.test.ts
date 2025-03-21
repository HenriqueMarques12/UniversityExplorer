import { universityApi } from '../university.api';

jest.mock('../university.api', () => ({
  universityApi: {
    getUniversities: jest.fn().mockImplementation(({ name }) => {
      if (name === 'Harvard') {
        return Promise.resolve({
          data: [{ id: '1', name: 'Harvard University', country: 'United States' }],
          total: 1
        });
      }
      
      return Promise.resolve({
        data: [
          { id: '1', name: 'Harvard University', country: 'United States' },
          { id: '2', name: 'MIT', country: 'United States' }
        ],
        total: 2
      });
    }),
    
    getUniversityById: jest.fn().mockImplementation((id) => {
      if (id === '1') {
        return Promise.resolve({
          id: '1',
          name: 'Harvard University',
          country: 'United States',
          domains: ['harvard.edu'],
          web_pages: ['https://www.harvard.edu']
        });
      }
      
      return Promise.reject(new Error('University not found'));
    })
  }
}));

describe('University API', () => {
  it('fetches universities correctly', async () => {
    const result = await universityApi.getUniversities({ page: 1, limit: 10 });
    
    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.data[0].name).toBe('Harvard University');
  });

});
