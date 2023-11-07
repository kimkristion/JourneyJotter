const User = require('./User');
const Logs = require('./Logs');

User.hasMany(Logs, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Logs.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Logs };