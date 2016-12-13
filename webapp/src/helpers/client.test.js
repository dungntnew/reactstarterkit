import ApiClient from './client'

test('test getjson', ()=> {
  const endpoint = '/test_events'
  const query = {
    'orderBy': 'latest',
    'limit': 10
  }

  return ApiClient.getJson(endpoint, query).then(json=> {
    return expect(json.total).toEqual(100)
  })
})
