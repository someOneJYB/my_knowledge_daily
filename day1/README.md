### day1 forEach 中设置异步函数无法获得期待的结果

- 使用 forEach 处理 异步的函数
```js
 function forEachFn() {
    function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
      
      async function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");
      
        values.forEach(async (value) => {

            console.log('About to run displayValuesWithWait() process for value ', value);
        
            await displayValuesWithWait(value);
        
            console.log('Finished displayValuesWithWait() for value ', value);
        });
        
        console.log("Finished displaying values");
      }
      
      valueLogger();
 }
 forEachFn()
```
打印结果：可以看出延迟打印但是 await 并不是我们期待的 Finished displaying values 输出在最后
// VM166:10 Starting to display values
// VM166:14 About to run displayValuesWithWait() process for value  1
// VM166:4 The current value is:  1
// VM166:14 About to run displayValuesWithWait() process for value  2
// VM166:4 The current value is:  2
// VM166:14 About to run displayValuesWithWait() process for value  3
// VM166:4 The current value is:  3
// VM166:14 About to run displayValuesWithWait() process for value  4
// VM166:4 The current value is:  4
// VM166:14 About to run displayValuesWithWait() process for value  5
// VM166:4 The current value is:  5
// VM166:21 Finished displaying values
// VM166:18 Finished displayValuesWithWait() for value  1
// VM166:18 Finished displayValuesWithWait() for value  2
// VM166:18 Finished displayValuesWithWait() for value  3
// VM166:18 Finished displayValuesWithWait() for value  4
// VM166:18 Finished displayValuesWithWait() for value  5

### 使用 for 循环处理
```js
 function forFn() {
    function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
      
      async function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");
      
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          console.log(
            "About to run displayValuesWithWait() process for value ",
            value
          );
      
          await displayValuesWithWait(value);
      
          console.log("Finished displayValuesWithWait() for value ", value);
        }
      
        console.log("Finished displaying values");
      }
      
      valueLogger();
 }
 forFn()
```
打印结果：可以看出延迟打印但是 await 可以看出我们期待的 Finished displaying values 输出在最后，保证了
Starting to display values
VM412:13 About to run displayValuesWithWait() process for value  1
VM412:3 The current value is:  1
VM412:20 Finished displayValuesWithWait() for value  1
VM412:13 About to run displayValuesWithWait() process for value  2
VM412:3 The current value is:  2
VM412:20 Finished displayValuesWithWait() for value  2
VM412:13 About to run displayValuesWithWait() process for value  3
VM412:3 The current value is:  3
VM412:20 Finished displayValuesWithWait() for value  3
VM412:13 About to run displayValuesWithWait() process for value  4
VM412:3 The current value is:  4
VM412:20 Finished displayValuesWithWait() for value  4
VM412:13 About to run displayValuesWithWait() process for value  5
VM412:3 The current value is:  5
VM412:20 Finished displayValuesWithWait() for value  5
VM412:23 Finished displaying values
### 使用 forOf 循环处理
```js
 function forOfFn() {
    function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
      
      async function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");
      
        for (const value of values) {
          console.log(
            "About to run displayValuesWithWait() process for value ",
            value
          );
      
          await displayValuesWithWait(value);
      
          console.log("Finished displayValuesWithWait() for value ", value);
        }
      
        console.log("Finished displaying values");
      }
      
      valueLogger();
 }
 forOfFn()
```
打印结果：可以看出延迟打印但是 await 可以看出我们期待的 Finished displaying values 输出在最后，保证了异步函数的优先级
Starting to display values
VM19402:12 About to run displayValuesWithWait() process for value  1
VM19402:3 The current value is:  1
VM19402:19 Finished displayValuesWithWait() for value  1
VM19402:12 About to run displayValuesWithWait() process for value  2
VM19402:3 The current value is:  2
VM19402:19 Finished displayValuesWithWait() for value  2
VM19402:12 About to run displayValuesWithWait() process for value  3
VM19402:3 The current value is:  3
VM19402:19 Finished displayValuesWithWait() for value  3
VM19402:12 About to run displayValuesWithWait() process for value  4
VM19402:3 The current value is:  4
VM19402:19 Finished displayValuesWithWait() for value  4
VM19402:12 About to run displayValuesWithWait() process for value  5
VM19402:3 The current value is:  5
VM19402:19 Finished displayValuesWithWait() for value  5
VM19402:22 Finished displaying values

### 从 babel 解析的 forEach for 和 forOf 在 lib 文件夹可以看出最大的区别就是 Finished displaying values 这个语句在 for 和 for of 中已经成为了 case 条件打印，保证了可以按照流程顺序打印输出，但是在 forEach 中 Finished displaying values 语句并不在控制流程中，导致无法按照顺序打印。

### 参考文章 https://www.becomebetterprogrammer.com/javascript-foreach-async-await/#Using_traditional_for_loop_for_sequential_executions

### 浅浅的翻译一下呢

#### 理解 javascript 的 async/await 在 foreach 函数中的行为

JavaScript通常是新程序员最早使用的编程语言之一，不仅因为它的普及和高需求，还因为它提供了使用面向对象编程和函数式编程混合的灵活性。不幸的是，这种灵活性可能会导致不容易识别的问题，例如使用Array.forEach()方法运行异步代码的隐藏问题。

目录	
- 为什么 Array.forEach（） 不适用于异步编程？
- 为什么 Array.forEach（） 与 async/await 实际上没有等待？
- 在循环中运行异步代码的替代解决方案 已经有代码
- 使用传统的 for 循环进行顺序执行，用于 ...用于顺序执行的循环 已经有嗲吗
- 使用 Promise.all 和 Array.map（） 进行并发执行（推荐）
- 结论

为什么 Array.forEach（） 不适用于异步编程？
寻找一个答案来解释为什么 forEach 在与 async 和 await 关键字一起使用时不能按预期工作是相当复杂的。

如果我们验证 Mozilla MZN Web https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 文档并通读 Array.prototype.forEach（） 参考，您会发现有一条注释说 forEach 需要一个同步函数。虽然这个网站已经成为JavaScript程序员的主要文档参考之一，但从理论上讲，它不是官方文档，尽管它们有很好的解释概念的方式。

JavaScript 的官方文档由 Ecma International 的 TC39 定义，TC39 是一组 JavaScript 开发人员，他们与社区合作，维护和改进 JavaScript 的定义。但是我们查看 https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.foreach 并没有看到对于异步函数的操作

让我们看一下以下示例，并检查一个典型的开发人员在 forEach 回调中编写异步逻辑，而不知道他将面临的隐藏问题。

推荐方案
- promisefy 函数
自己堆叠 then
```js
const start = Promise.resolve()
  function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");
      
        values.forEach(async (value) => {
            start = start.then((res, rej) => {
            console.log('About to run displayValuesWithWait() process for value ', value);
        
            displayValuesWithWait(value);
        
            console.log('Finished displayValuesWithWait() for value ', value);
            res()
            })
        });
        start.then(() => {
            console.log("Finished displaying values");
        })
      }

```
- 文章推荐的 使用 Promise.all 和 Array.map（） 进行并发执行（推荐）
```js
function mapFn() {
    function displayValuesWithWait(value) {
        console.log("The current value is: ", value);
      }
      
      async function valueLogger() {
        const values = [1, 2, 3, 4, 5];
      
        console.log("Starting to display values");

        await Promise.all(values.map(async (value) => {
      console.log(
        "About to run displayValuesWithWait() process for value ",
        value
      );

      await displayValuesWithWait(value);

      console.log("Finished displayValuesWithWait() for value ", value);
    }))
      
        console.log("Finished displaying values");
      }
      
      valueLogger();
 }
 mapFn()
```

结论
总而言之，JavaScript forEach 函数同步执行代码，无论是否使用 async 和 await 关键字，这些关键字旨在异步运行代码。对异步代码使用 forEach 并不意味着代码不会运行。但是，它将以意外的行为运行。

幸运的是，有一些解决方案可以为数组的所有项目运行异步代码，例如使用传统的JavaScript循环（for (...;...;...)或for ... of） 用于顺序执行，或将 Promise.all 与 array.map() 组合用于并发执行。

### 下期预告 react 系列大赏