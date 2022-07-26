const roleChecker = async({member , command}) => {

    const roles = command.requiredRoles;
    const foundRoles = roles.filter(role => member.roles.cache.has(role));

    if(foundRoles.length > 0) return true
    else return false;
}

module.exports.roleChecker = roleChecker;