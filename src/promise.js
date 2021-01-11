const pending = "PENDING";
const rejecting = "REJECTED";
const fulfilled = "FULFILLED";
class MyPromise {
  // pendding\
  constructor(func) {
    this.errs = [];
    this.sucs = [];
    this.status = pending;
    this.catchError = null;
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.catchError = error;
    }
  }
  catch(callback) {
    this.catchError && callback(this.catchError);
  }
  then(resolve, reject) {
    this.errs.push(reject);
    this.sucs.push(resolve);
    return this;
  }
  resolve(success) {
    if (this.status === pending) {
      this.status = fulfilled;
      setTimeout(() => {
        this.sucs.forEach((suc) => {
          suc(success);
        });
      }, 0);
    }
  }
  reject(error) {
    if (this.status === pending) {
      this.status = rejecting;
      setTimeout(() => {
        this.errs.forEach((err) => {
          err(error);
        });
        const err = this.errs.shift();
        err(error);
      }, 0);
    }
  }
}

MyPromise.prototype.all = (funcs) => {};

function test1() {
  console.log("===test promise");

  Promise.all([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
  ]).then((data) => console.log(data));
}
function test2() {
  console.log("===test my promise");

  let p = new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  });

  p.then((res) => {
    console.log(res);
  });

  console.log(2);
}

test1();
test2();
