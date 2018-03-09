import myexamine from '@/views/ot/ot-myexamine';
import { mount } from 'vue-test-utils';
import Sinon from 'sinon';
import SinonStubPromise from 'sinon-stub-promise';
import axios from 'axios';
SinonStubPromise(Sinon);
describe('myexamine', () => {
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(myexamine);
  // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
  const vm = wrapper.vm;

  it('获取列表数据', () => {
    let promiseCall;

    before(function () {
      promiseCall = Sinon.stub(axios, 'post').returnsPromise();
      it('输入数据没错', (done) => {
        expect(vm.page).to.be.equal('0');
        expect(vm.pageSize).to.be.equal('10');
        done();
      });
    });

    after(function () {
      axios.post.restore();
    });

    it('should contain proper methods', function (done) {
      expect(typeof vm.getList).to.be.equal('function');
      done();
    });

    // https://github.com/substantial/sinon-stub-promise
    it('helloCall should set proper data from AJAX response [success]', function (done) {
      promiseCall.resolves({
        data: {
          rows: 1,
          count: 1
        }
      });
      vm.getList();
      expect(vm.tableData).to.be.equal('1');
      done();
    });
  });
});
