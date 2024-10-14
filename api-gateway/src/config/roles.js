const allRoles = {
  user: [
    'getProducts',
    'getCart',
    'addToCart',
    'removeFromCart',
    'updateCart',
    'deleteCart',
  ],
  admin: ['getUsers', 'manageUsers', 'manageProducts', 'manageCarts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
