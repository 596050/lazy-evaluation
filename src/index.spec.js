import Lazy from "./index";

describe("Lazy evaluation", () => {
  describe("Expected usage", () => {
    let computation;
    beforeEach(() => {
      computation = new Lazy();
    });

    it("should allow chaining add method and finally evaluate", () => {
      const inputs = [
        [(a) => a * 2], //
        [(a, b) => a + b, 1],
      ];
      const evaluateInput = [1, 2];
      const output = [3, 5];

      inputs.forEach((input) => {
        computation.add(...input);
      });
      expect(computation.evaluate(evaluateInput)).toEqual(output);
    });

    describe("Multiple evaluate calls for one lazy instance", () => {
      let computation;
      beforeAll(() => {
        computation = new Lazy();
      });
      it.each`
        addInput                                              | evaluateInput | expected
        ${[(a) => a * 2]}                                     | ${[1, 2]}     | ${[2, 4]}
        ${[(a, b) => a + b, 1]}                               | ${[1, 2]}     | ${[3, 5]}
        ${undefined}                                          | ${[1, 2]}     | ${[3, 5]}
        ${[(a, b, c, d, e) => a + b + c + d + e, 1, 1, 1, 1]} | ${[1, 2]}     | ${[7, 9]}
      `(
        "should return $expected when given add input $addInput and evaluate input is $evaluateInput for evaluate calls",
        ({ addInput, evaluateInput, expected }) => {
          if (addInput) {
            computation.add(...addInput);
          }
          const actual = computation.evaluate(evaluateInput);
          expect(actual).toEqual(expected);
        }
      );
    });
  });

  describe("Unsupported usage", () => {
    let computation;
    beforeEach(() => {
      computation = new Lazy();
    });
    it("should throw exception on unexpected args to add", () => {
      const evaluateInput = [1, 2];
      [undefined, null, []].forEach((arg) => {
        computation.add(arg);
        expect(() => computation.evaluate(evaluateInput)).toThrow();
      });
    });
    it("should throw exception on unexpected args to evaluate", () => {
      [undefined, null].forEach((arg) => {
        expect(() => computation.evaluate(arg)).toThrow();
      });
    });
  });
});
