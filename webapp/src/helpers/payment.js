import _ from 'lodash'

function encryptFirstN(number) {
  return _.fill(number.split(""), '*', 0, number.length - 4).join("")
}

module.exports = {
  encryptFirstN
}
