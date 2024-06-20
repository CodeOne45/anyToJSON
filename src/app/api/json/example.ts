export const EXAMPLE_PROMPT = `DATA: \n"John is 25 years old and studies computer science at university"\n\n-----------\nExpected JSON format: 
{
  name: { type: "string" },
  age: { type: "number" },
  isStudent: { type: "boolean" },
  courses: {
    type: "array",
    items: { type: "string" },
  },
}
\n\n-----------\nValid JSON output in expected format:`

export const EXAMPLE_ANSWER = `{
name: "John",
age: 25,
isStudent: true,
courses: ["computer science"],
}`