import test from 'ava';
import m from '.';

let cdTop = '/Users/lizhenyong/Desktop/JSJSJSJSJSJJSJS——project'

test('list this project', async t => {
	let res = await m(__dirname, ["*node_modules"])
	t.is(res.length, 2)
});


test('list this project', async t => {
	let res = await m(__dirname, "*node_modules")
	t.is(res.length, 2)
});
