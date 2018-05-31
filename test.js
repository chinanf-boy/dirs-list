import test from 'ava';
import m from '.';

test('list this project', async t => {
	let res = await m(__dirname, {match:["*node_modules"],ignore:["*.git"]})
	t.is(!!res.length, true)
});


test('list this project', async t => {
	let res = await m(__dirname, {match:"*node_modules", ignore:"*.git"})
	t.is(!!res.length, true)
});
