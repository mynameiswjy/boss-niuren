
/*
* 根据type ，avatar 判断路径
* */
export function getRedirecTo(type, avatar) {
  let path = ''
  path = type === 'boss' ? '/boss' : '/niuren'
  if (!avatar) {
    path += 'info'
  }
  return path
}