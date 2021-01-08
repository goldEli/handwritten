class MyPromise {
  // pendding\
  constructor(func) {
    this.errs = [];
    this.sucs = [];
    func(this.resolve.bind(this), this.reject.bind(this));
  }
  then(resolve, reject) {
    this.errs.push(reject);
    this.sucs.push(resolve);
    return this;
  }
  resolve(success) {
    setTimeout(() => {
      this.sucs.forEach((suc) => {
        suc(success);
      });
    }, 0);
  }
  reject(error) {
    setTimeout(() => {
      this.errs.forEach((err) => {
        err(error);
      });
      const err = this.errs.shift();
      err(error);
    }, 0);
  }
}

function test1() {
  function resolve(arg) {
    console.log(arg);
  }
  function reject(arg) {
    console.log(arg);
  }
  new Promise((resolve, reject) => {
    console.log("mypromise");
    resolve("success");
    // reject("error");
  })
    .then(resolve, reject)
    .then(
      (data) => console.log(data),
      (error) => console.log(error)
    );
}
function test2() {
  function resolve(arg) {
    console.log(arg);
  }
  function reject(arg) {
    console.log(arg);
  }
  new MyPromise((resolve, reject) => {
    console.log("mypromise");
    resolve("success");
    // reject("error");
  })
    .then(resolve, reject)
    .then(
      (data) => console.log(data),
      (error) => console.log(error)
    );
}

test1();
// test2();
