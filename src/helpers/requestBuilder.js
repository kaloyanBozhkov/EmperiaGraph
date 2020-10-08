const apiBase = 'https://kaloyanbozhkov.com/emperia'

// build our request object
function requestBuilder() {
  return {
    setEndpoint(endpoint) {
      this.endpoint = endpoint
      return this
    },
    setMethod(method) {
      this.method = method
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
    setBody(body, stringify = true) {
      this.body = stringify ? JSON.stringify(body) : body
      return this
    },
    build() {
      return new Request(this.method, this.endpoint, this.params, this.headers, this.body)
    },
  }
}

// perform request
function Request(method, endpoint, params, headers = {}, body) {
  this.method = method
  this.endpoint = endpoint
  this.params = params
  this.headers = headers
  this.body = body

  this.fetchApi = function () {
    const url = this.params ? `${apiBase}/${this.endpoint}?${this.params}` : `${apiBase}/${this.endpoint}`

    return fetch(url, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    })
  }
}

export default requestBuilder
