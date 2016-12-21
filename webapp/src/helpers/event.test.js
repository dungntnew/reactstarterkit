import {
  formatPrice,
  formatDateAndTimeStr,
} from './event'

test('format price 1', ()=>{
  expect(formatPrice(0)).toBe('0円')
})

test('format price 2', ()=>{
  expect(formatPrice(null)).toBe('-円')
})

test('format price 3', ()=>{
  expect(formatPrice(50)).toBe('50円')
})

test('format price 4', ()=>{
  expect(formatPrice(1000)).toBe('1,000円')
})

test('format price 5', ()=>{
  expect(formatPrice(999999)).toBe('999,999円')
})

test('format price 6', ()=>{
  expect(formatPrice(11111111)).toBe('11,111,111円')
})

test('format date and time in str pair 1', ()=> {
  expect(formatDateAndTimeStr('20161221', '16:14:00')).toBe('2016年12月21日午後4時14分 水曜日')
})

test('format date and time in str pair 2', ()=> {
  expect(formatDateAndTimeStr('20161221', '16:14')).toBe('2016年12月21日午後4時14分 水曜日')
})

test('format date and time in str pair 3', ()=> {
  expect(formatDateAndTimeStr('20161221', '1614')).toBe('2016年12月21日午後4時14分 水曜日')
})
