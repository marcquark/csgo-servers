'use strict';

module.exports = function(Category) {
  Category.validatesUniquenessOf('name', {
    message: 'A category with that name already exists',
  });
};
