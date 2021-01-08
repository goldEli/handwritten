const pending = "PENDING";
const rejecting = "REJECTED";
const fulfilled = "FULFILLED";
class MyPromise {
  // pendding\
  constructor(func) {
    this.errs = [];
    this.sucs = [];
    this.status = pending;
    func(this.resolve.bind(this), this.reject.bind(this));
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

function test1() {
  console.log("===test promise");
  new Promise((resolve, reject) => {
    resolve("success");
    reject("error");
  }).then(
    (data) => {
      console.log(data);
    },
    (data) => {
      console.log(data);
    }
  );
}
function test2() {
  console.log("===test my promise");
  new Promise((resolve, reject) => {
    resolve("success");
    reject("error");
  }).then(
    (data) => {
      console.log(data);
    },
    (data) => {
      console.log(data);
    }
  );
}

test1();
test2();
