export default class DataStorage {
  constructor() {
    // Полезность этого класса сомнительна, но по заданию он требуется.
  }

  getRequest() {
    return localStorage.getItem('request');
  }

  setRequest(request) {
    localStorage.setItem('request', request);
  }

  getData() {
    return JSON.parse(localStorage.getItem('data'));
  }

  setData(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }




}
