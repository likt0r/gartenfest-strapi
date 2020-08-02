module.exports = {
  removeHistory(entity) {
    if (entity) {
      delete entity.created_by;
      delete entity.updated_by;
      delete entity.created_at;
      delete entity.updated_at;
    }
  },
};
