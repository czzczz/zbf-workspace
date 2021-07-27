# Not Shell Command Tools

基于 commanderjs 及 shelljs 的命令行工具包，封装常用不常用的指令。

## 查看内置命令

```sh
nsh # 或
nsh -h
```

## 使用 NotShell 的跨平台能力执行 shell 指令

**NotShell 的执行能力依赖于`shelljs`的 API，具体跨端能力参考[shellJS](https://github.com/shelljs/shelljs)**

```
nsh ls -al
nsh rm -rf node_modules
```
