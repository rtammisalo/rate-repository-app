import { render, within } from '@testing-library/react-native'
import { RepositoryListContainer } from '../../components/RepositoryList'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      const { getAllByTestId } = render(
        <RepositoryListContainer
          repositories={repositories}
          getOnPress={() => {}}
        />
      )

      const repositoryItems = getAllByTestId('repositoryItem')
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

      const getField = (index, field) => {
        return repositories.edges[index].node[field]
      }

      let name = within(firstRepositoryItem).getByText(getField(0, 'fullName'))
      let desc = within(firstRepositoryItem).getByText(
        getField(0, 'description')
      )
      let lang = within(firstRepositoryItem).getByText(getField(0, 'language'))
      let forks = within(firstRepositoryItem).getByText('1.6k')
      let stars = within(firstRepositoryItem).getByText('21.9k')
      let rating = within(firstRepositoryItem).getByText('88')
      let reviews = within(firstRepositoryItem).getByText('3')

      expect(name).toHaveTextContent(getField(0, 'fullName'))
      expect(desc).toHaveTextContent(getField(0, 'description'))
      expect(lang).toHaveTextContent(getField(0, 'language'))
      expect(forks).toHaveTextContent('1.6k')
      expect(stars).toHaveTextContent('21.9k')
      expect(rating).toHaveTextContent('88')
      expect(reviews).toHaveTextContent('3')

      name = within(secondRepositoryItem).getByText(getField(1, 'fullName'))
      desc = within(secondRepositoryItem).getByText(getField(1, 'description'))
      lang = within(secondRepositoryItem).getByText(getField(1, 'language'))
      forks = within(secondRepositoryItem).getByText('69')
      stars = within(secondRepositoryItem).getByText('1.8k')
      rating = within(secondRepositoryItem).getByText('72')
      reviews = within(secondRepositoryItem).getByText('3')

      expect(name).toHaveTextContent(getField(1, 'fullName'))
      expect(desc).toHaveTextContent(getField(1, 'description'))
      expect(lang).toHaveTextContent(getField(1, 'language'))
      expect(forks).toHaveTextContent('69')
      expect(stars).toHaveTextContent('1.8k')
      expect(rating).toHaveTextContent('72')
      expect(reviews).toHaveTextContent('3')
    })
  })
})
