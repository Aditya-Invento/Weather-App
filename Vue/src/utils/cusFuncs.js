export const def_prop = (type,def='',required=false,validator=()=>{}) => {
  return {
    type: type,
    required: required,
    default: def,
    validator: validator//true = valid
  }
}