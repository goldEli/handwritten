function lazyMan(name) {
  const queue = [];
  const next = () => {
    const task = queue.shift();
    task?.();
  };
  const api = {
    sleep(time = 0) {
      const task = () => {
        setTimeout(() => {
          console.log(`I woke up, I was asleep ${time} s`);
          next();
        }, time * 1000);
      };
      queue.push(task);
      return api;
    },
    sleepFirst(time = 0) {
      const task = () => {
        setTimeout(() => {
          console.log(`I woke up, I was asleep ${time} s`);
          next();
        }, time * 1000);
      };
      queue.unshift(task);
      return api;
    },
    eat(content) {
      const task = () => {
        console.log(`I eat ${content}`);
        next();
      };
      queue.push(task);
      return api;
    },
    sayHi() {
      const task = () => {
        console.log(`I'm ${name}`);
        next();
      };
      queue.push(task);
      return api;
    }
  };
  api.sayHi();

  setTimeout(() => {
    console.log(queue);
    next();
  }, 0);

  return api;
}

// lazyMan("hank").sleep(10).eat("lunch");
lazyMan("hank").sleepFirst(10).eat("lunch");
