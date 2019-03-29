This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# React JSON Formatter
A small demo for reusable React Component. It takes data object and format it to a more readable JSON format

## Example ScreenShot
![image](https://github.com/MiaXIA/ReactJSONFormatter/raw/master/Example.png)

## Build and Run Locally
use command in terminal

```
cd /the path where this folder is
npm install
npm start
```
Then it will run at [`localhost:3000`](http://localhost:3000)

## Usage
Include the JSONFormatter.js file and provide the variable to render as the `value` property.

```
import JSONFormatter from "/path to JSONFormatter.js";

var data = {
  str: 'Test String',
  bool: true,
  num: 0,
  arr: [
    'Test Array',
    {
      key: 'Test Object Key'
    }
  ]
}

<JSONFormatter data={data} />
```
