import fetchMock from 'fetch-mock'
import { checkReleases, exampleResponseJson } from '../checkReleases'
describe('GIT', () => {
  it('pulls when update available', async () => {
    const mockFetch = () => ({
      json: async () => exampleResponseJson,
      ok: true,
    })
    const mockPull = jest.fn()
    const result = await checkReleases('0.4.0', mockFetch as any, () => ({
      pull: mockPull,
    }))
    expect(mockPull).toHaveBeenCalled()
  })
})
