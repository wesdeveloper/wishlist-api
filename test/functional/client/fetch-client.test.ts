describe('Fetch clients', () => {
  it('should fetch clients', async () => {
    const { body, status } = await global.testRequest
      .get('/client');

    expect(status).toEqual(200);
    expect(body).toEqual(expect.objectContaining({
      clients: expect.any(Array),
      pagination: expect.any(Object),
    }));
  });
});
