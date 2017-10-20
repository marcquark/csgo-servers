'use strict';

module.exports = function(Tag) {
  Tag.validatesUniquenessOf('name', {
    message: 'A tag with that name already exists!',
  });
};
