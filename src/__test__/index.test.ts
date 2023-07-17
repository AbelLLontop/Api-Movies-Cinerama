import { sum } from '../utils/math';

describe("test index",()=>{
	test('test sum',()=>{
		expect(sum(1,2)).toBe(4);
	});
});