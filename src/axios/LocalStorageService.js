const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("FBIdToken", tokenObj.FBIdToken);
    localStorage.setItem("FBRefreshToken", tokenObj.FBRefreshToken);
  }
  function _getAccessToken() {
    return localStorage.getItem("FBIdToken");
  }
  function _getRefreshToken() {
    return localStorage.getItem("FBRefreshToken");
  }
  function _clearToken() {
    localStorage.removeItem("FBIdToken");
    localStorage.removeItem("FBRefreshToken");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
