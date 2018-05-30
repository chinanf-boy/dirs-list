'use strict';
const fs = require('mz/fs')
const matcher = require('matcher');
const path = require('path')

const  readMdir = async (Dir) =>{

    var dirlist = await fs.readdir(Dir, 'utf8').then( files => files).catch(err => err)
	return dirlist

}

/**
 * @description get contentDir dir path
 * @param {string} contentDir
 * @param {string} match
 * @param {Array} output = []
 * @returns output
 */
const Listmd = async (contentDir,match = [],output = []) =>{
	if(typeof match == 'string'){
		let m1 = match
		match = []
		match.push(m1)
	}
    var input = []

	let isFile = await fs.lstat(contentDir).then(x =>x.isFile())

	if( isFile ){
        input.push(path.basename(contentDir))
        contentDir = path.dirname(contentDir)
    }else{


		if( ! contentDir.endsWith('/') ){
			contentDir += '/'
		}
		input = await readMdir(contentDir)
    }

    if (input instanceof Error)
        return Promise.reject(input)

    while ( input.length ){
		let path_string = input.shift()
		let absp = path.resolve(contentDir,path_string)
		let isDir = await fs.lstat(absp).then(x =>x.isDirectory())
		let m = match.every(m =>{
			return matcher.isMatch(absp, m)
		})
        if(isDir && m){
            output.push(absp)
        }else if(isDir){
            await Listmd(absp, match ,output)
        }
    }


    return Promise.resolve( output )

}

module.exports = Listmd
