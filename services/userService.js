var UserDB = promise.promisifyAll(commonUtil.getModel('user'));

module.exports.addUser = function(data,next) {
    var user = new UserDB(data);
    user.saveAsync(data)
    .then(function(dbData) {
        return next(null, dbData);
    })
    .catch(function(err) {
        return next(err);
    });
};

module.exports.findUser = function(query, next) {
    UserDB.findAsync(query)
    .then(function (dbData) {
        return next(null, dbData);
    })
    .catch(function (err) {
        return next(err);
    });
};





