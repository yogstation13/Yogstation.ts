type Cast<A, B> = A extends B ? A : B;

type Narrowable = string | number | bigint | boolean;

export type Narrow<A> = Cast<A, [] | (A extends Narrowable ? A : never) | { [K in keyof A]: Narrow<A[K]> }>;
export type PromiseType<T> = T extends PromiseLike<infer U> ? U : never;

export type ArrayType<T> = T extends Array<infer U> ? U : never;
