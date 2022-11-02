const mockFetch = (mockData) => Promise.resolve({
  json: () => Promise.resolve(mockData),
});

export default mockFetch;
