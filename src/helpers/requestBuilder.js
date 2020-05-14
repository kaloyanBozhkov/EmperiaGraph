const apiBase = 'https://16eeb7d1-f01e-45e8-818a-0d1cd0522b05.mock.pstmn.io' //https://www.kaloyanbozhkov.com/emperia'

// build our request object
function requestBuilder() {
  return {
    setMethod(method) {
      this.method = method
      return this
    },
    setUrl(url) {
      this.url = url
      return this
    },
    setParams(params) {
      this.params = params
      return this
    },
    setHeaders(headers) {
      this.headers = headers
      return this
    },
    setBody(body) {
      this.body = body
      return this
    },
    build() {
      return new Request(this.method, this.url, this.params, this.headers, this.body)
    },
  }
}

// perform request
function Request(method, url, params, headers = {}, body) {
  this.method = method
  this.url = url
  this.params = params
  this.headers = headers
  this.body = body

  this.fetchApi = function () {
    const url = this.params ? `${apiBase}/${this.url}?${this.params}` : `${apiBase}/${this.url}`

    return fetch(url, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
    })
  }
}

export default requestBuilder
