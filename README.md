# sails-bigpipe
Bigpie模块 for Express/Sails, 简单api，灵活好用~

- Bigpie for Express, Sails
- Simple API: start, pipe, end

````Javascript
var bp = new Bigpipe('bp_id')
bp.start('viewpath/index.html')
.pipe([pipeA, pipeB, pipeC, ...])
.end()

```
