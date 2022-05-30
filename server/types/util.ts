import type { RouteHandler } from "fastify";
import type { RouteGenericInterface } from "fastify/types/route.js";

type Cast<A, B> = A extends B ? A : B;

type Narrowable = string | number | bigint | boolean;

export type Narrow<A> = Cast<A, [] | (A extends Narrowable ? A : never) | { [K in keyof A]: Narrow<A[K]> }>;
export type PromiseType<T> = T extends PromiseLike<infer U> ? U : never;

export type ArrayType<T> = T extends Array<infer U> ? U : never;

export type OmitThisArg<F> = F extends (this: never, ...args: infer P) => infer R ? (...args: P) => R : never;
export type ArrowRouteHandler<T = RouteGenericInterface> = OmitThisArg<RouteHandler<T>>;
