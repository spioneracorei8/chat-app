## Start project

- ```npm init```

- ```npm install typescript --save-dev```


- ```npx tsc --init```
    - `Generate the tsconfig.json file`
- ```npm i @types/node```

### Error: Unknow file extention .ts
Solve:
https://www.codingbeautydev.com/blog/ts-node-unknown-file-extension-ts

# Dependencies installation

```
npm install express nodemon @types/express
```
```
npm install dotenv
```
```
npm install mongoose @types/mongoose
```

### Problem
- Problem: can not import mongoose, { Connection } from "mongoose"
    - Error: Cannot find module 'mongoose'. Did you mean to set  - the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?ts(2792)
    - Solve: set tsconfig.json: "moduleResolution": "Node", 