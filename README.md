# pull-property

A pull-stream that represents a property.

read calls back the most recently set value
unless it's already called that back.

set initial value via constructor,
otherwise call `read.update(value)`
call `read.end()` when you are finished.

``` js
var p = require('pull-property')

pull(p, pull.collect(console.log))

p.update(foo)
//if the sink is async,
//this will update the value befor it's read
//so they will just see bar.
p.update(bar)

p.end()
```


## License

MIT
