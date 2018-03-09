
const path = require('path');
const assert = require('assert');
const expect = require('chai').expect;
const authService = require('../../services/settings/auth-service');
	// describe('Auth Auth-Service', () => {
	// 	it('test Auth', async () => {
	// 	  let result = await authService.getDeptList();
	// 	  console.log('@result');
	// 	  console.dir(result);
    //     })
	// })

	describe('Auth Auth-Service', () => {
		it('test Auth', async () => {
		  let result = await authService.updateDept({checker: '测试'}, {where: {id: 10}});
		  console.log('@result');
		  console.dir(result);
        })
	})