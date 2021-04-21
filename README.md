# Lazy evaluation

I attempted to adhere to the instruction of "Don't be defensive about the degenerate cases (E.g. bad / missing arguments)" which I interpreted as avoiding error handling completely.

The add method creates a closure with the arguments passed. This is stored in a queue and the instance returned (_this_).

The evaluate method has simple memoization so that all the previous transformations do not need to be processed each time evaluate is called for the same value. The memoization map is constructed like so: Arg -> (Queue Depth, Value At That Depth).

## Install dependencies

```bash
yarn
```

## Run tests

```bash
yarn test
```
