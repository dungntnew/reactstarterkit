import ApiClient from './client'

test('test getjson', ()=> {
  const endpoint = '/get_todos'
  const query = {
    'orderBy': 'latest',
    'limit': 10
  }

  return ApiClient.getJson(endpoint, query).then(json=> {
    return expect(json.length).toEqual(4)
  })
})
