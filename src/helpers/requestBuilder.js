const apiBase = 'https://kaloyanbozhkov.com/emperia/'

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
