module.exports = Object.freeze({
    SECRET_KEY: "some-secret-shit-goes-here",
    REFRESH_SECRET_KEY: "some-secret-refresh-token-shit",
    TOKEN_LIFE: 900,
    REFRESH_TOKEN_LIFE: 86400,
    INFO_LOGGER_TYPE : 'INFO',
    PASSWORD_REGEX : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
    EMAIL_REGEX : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NUMBER_REGEX : /^\d+$/,
    NAME_REGEX : /^[A-Za-z]+$/,
    INVALID_PASSWORD_ERROR : 'Please enter valid Password.',
    INVALID_EMAIL_ERROR : 'Please enter valid Email',
    INVALID_NAME : 'Please enter valid name',
    USER_ALREADY_EXIST : 'User Already Exists',
    INFO_LOGGER_TYPE : 'INFO',
    ERROR_LOGGER_TYPE : 'ERROR',
});