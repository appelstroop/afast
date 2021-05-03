import { Project } from '../../types'
import { sortProjects } from '../getProjects'

describe('GetProjects', () => {
  it('sorts projects based on billable flag', () => {
    const projects: Project[] = [
      {
        wsts: [],
        code: '1',
        name: 'cat',
        general: 1,
        start: '1',
        end: '1',
        billable: false,
      },
      {
        wsts: [],
        code: '1',
        name: 'cat',
        general: 1,
        start: '1',
        end: '1',
        billable: true,
      },
    ]
    expect(projects.slice().sort(sortProjects)[0]).toEqual(projects[1])
  })
})
