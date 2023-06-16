# Improving performance of typia

This repo is a demo of the performance improvement after this PR https://github.com/samchon/typia/pull/663

**Before**
```
zod x 395,806 ops/sec ±0.40% (94 runs sampled)
typia x 9,382,214 ops/sec ±0.98% (96 runs sampled)
ajv x 18,223,948 ops/sec ±1.09% (91 runs sampled)
Fastest is ajv
```

**After**
```
zod x 386,725 ops/sec ±0.66% (95 runs sampled)
typia x 13,494,325 ops/sec ±0.79% (94 runs sampled)
ajv x 18,027,226 ops/sec ±0.42% (98 runs sampled)
Fastest is ajv
```