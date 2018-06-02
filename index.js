'use strict';
const fs = require('mz/fs')
const matcher = require('matcher');
const path = require('path')
let allRunPath = 0

const readMdir = async (Dir) => {

	var dirlist = await fs.readdir(Dir, 'utf8').then(files => files).catch(err => err)
	return dirlist

}

/**
 * @description get contentDir dir path
 * @param {string} contentDir
 * @param {string|Array} options.match
 * @param {string|Array} options.ignore
 * @param {Array} output = []
 * @returns output
 */
const Listmd = async (contentDir, options, output = []) => {
	contentDir = contentDir || process.cwd()

	let match = options.match || []
	let ignore = options.ignore || []

	if (typeof match == 'string') {
		let m1 = match
		match = []
		match.push(m1)
	}
	if (typeof ignore == 'string') {
		let i1 = ignore
		ignore = []
		ignore.push(i1)
	}


	let input = []

	let isFile = await fs.lstat(contentDir).then(x => x.isFile())

	if (isFile) {
		input.push(path.basename(contentDir))
		contentDir = path.dirname(contentDir)
	} else {


		if (!contentDir.endsWith('/')) {
			contentDir += '/'
		}
		input = await readMdir(contentDir)
	}

	if (input instanceof Error)
		return Promise.reject(input)

	while (input.length) {
		allRunPath++
		let path_string = input.shift()
		let absp = path.resolve(contentDir, path_string)
		let isDir = await fs.lstat(absp).then(x => x.isDirectory())

		let m = match.every(m => {
			return matcher.isMatch(absp, m)
		})

		let ignorePath = ignore.some(i =>{
			return matcher.isMatch(absp, i)
		})

		if (isDir && m) {
			output.push(absp)
		} else if (isDir) {

			if(!ignorePath){
				await Listmd(absp, options, output)
			}

		}
	}

	return Promise.resolve(output)

}

module.exports = Listmd
