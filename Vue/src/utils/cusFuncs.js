export const def_prop = (type,def='',required=false,validator=()=>{}) => {
  console.log('Aaya')
  return {
    type: type,
    required: required,
    default: def,
    validator: validator//true = valid
  }
}