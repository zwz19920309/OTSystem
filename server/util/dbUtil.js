/**
  * 查询所有-条件查询-分页查询
  * @param  {object} params
  * @example {cons: {name:'1'},limit:0,offset:10}
  * @return {object} sequelize执行结果
 */
let findAll = async (Model, params) => {
  return Model.findAll(params);
};

/**
  * 查询所有-统计
  * @param  {object} params
  * @example {cons: {name:'1'}}
  * @return {object} sequelize执行结果
 */
let count = async (Model, params) => {
  return Model.count(params);
};

/**
  * 根据条件-删除
  * @param  {object} params
  * @example {cons: {name:'1'}}
  * @return {object} sequelize执行结果
 */
let deleteByCons = async (Model, params) => {
  return Model.destroy(params);
};

/**
  * 条件查询-类型集合
  */
let CTYPES = {
  AND: '$and', // AND (a = 5)
  OR: '$or', // (a = 5 OR a = 6)
  GT: '$gt', // id > 6
  GTE: '$gte', // id >= 6
  LT: '$lt', // id < 10
  LTE: '$lte', // id <= 10
  NE: '$ne', // id != 20
  BETWEEN: '$between', // BETWEEN 6 AND 10
  NOTBETWEEN: '$notBetween', // NOT BETWEEN 11 AND 15
  // IN: '$in', //IN [1, 2]
  NOTIN: '$notIn', // NOT IN [1, 2]
  LIKE: '$like', // LIKE '%hat'
  NOTLike: '$notLike', // NOT LIKE '%hat'
  ILike: '$iLike', // ILIKE '%hat' (case insensitive)  (PG only)
  NOTILike: '$notILike', // NOT ILIKE '%hat'  (PG only)
  OVERLAP: '$overlap', // && [1, 2] (PG array overlap operator)
  CONTAINS: '$contains', // @> [1, 2] (PG array contains operator)
  CONTAINED: '$contained', // <@ [1, 2] (PG array contained by operator)
  ANY: '$any', // ANY ARRAY[2, 3]::INTEGER (PG only)
  NOT: '$not' // status NOT FALSE
};
/**
 * 增加查询条件
*/
let addCon = function (key, type, val) {
  key[type] = val;
  return key;
};
module.exports = {
  CTYPES,
  addCon,
  findAll,
  count,
  deleteByCons
};
