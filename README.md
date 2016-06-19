This project demonstrates an [issue](https://github.com/jspm/jspm-cli/issues/1919) that I have observed with jspm on Windows 10 x64

To reproduce:
-----
 - Clone project
 - npm install
 - gulp build

 You should receive a message something like:
 ```
 adavis@AndyLaptop MINGW64 ~/dev/experiments/demonstrate-jspm-issue (master)
 $ gulp build
 [10:00:33] Using gulpfile ~\dev\experiments\demonstrate-jspm-issue\Gulpfile.js
 [10:00:33] Starting 'build'...
 [10:00:34] 'build' errored after 958 ms
 [10:00:34] Error on fetch for common/common.js at file:///C:/Users/adavis/dev/experiments/demonstrate-jspm-issue/common/common.js
         Loading client\app\app.js
         Error: ENOENT: no such file or directory, open 'C:\Users\adavis\dev\experiments\demonstrate-jspm-issue\common\common.js'

     at Error (native)
```

To workaround the issue:
--
- Edit package.json and change jspm line from

    "jspm": "0.16.39",

    to

    "jspm": "0.16.36",

 - npm install
 - gulp build

Build Succeeds:

```
adavis@AndyLaptop MINGW64 ~/dev/experiments/demonstrate-jspm-issue (master)
$ gulp build
[10:02:30] Using gulpfile ~\dev\experiments\demonstrate-jspm-issue\Gulpfile.js
[10:02:30] Starting 'build'...
[10:02:32] Finished 'build' after 2.15 s
```

Better workaround:

Edit Gulpfile.js so that the resolveTo function reads as:

```javascript
var resolveTo = function(resolvePath) {
	return function(glob) {
		glob = glob || '';
		return path.join(root, resolvePath, glob).replace(/\\/g, '/');
	}
};
```

*just append the replace to the path.join() command.*

Thanks to @guybedford at jspm for the workaround!