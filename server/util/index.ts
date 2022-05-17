import { requestContext } from "@fastify/request-context";
import RelativeTime from "@yaireo/relative-time";
import type { preValidationHookHandler } from "fastify";

export function ckeyify(key: string) {
  return key.replaceAll(/[^\w-@]/g, "").toLowerCase();
}

export type WebPermission = typeof webPermissions extends ReadonlyArray<infer T> ? T : never;

export const webPermissions = [
  "action_log.access",
  "activity.access",
  "ban.add",
  "ban.manage",
  "book.delete",
  "book.deleted",
  "loa.add",
  "loa.others",
  "note.access",
  "note.manage",
  "player.access",
  "round.active",
  "round.logs",
  "transaction_log.access",
  "watchlist.edit",
  "website.debug",
] as const;

export const isWebPerm = (perm: string) => webPermissions.includes(perm as WebPermission);

export function isEmpty(obj: Record<string, unknown>) {
  for (const x in obj) {
    if (Object.hasOwn(obj, x)) return false;
  }
  return true;
}

export function authRoute(...perms: [WebPermission, ...WebPermission[]]) {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handler: preValidationHookHandler = (req, res, done) => {
    if (!req.session.perms) {
      req.flash("error", "Login required");
      return res.redirect(`/login?next=` + encodeURIComponent(req.url));
    }

    for (const perm of perms) {
      if (req.session.perms.includes(perm)) continue;

      req.flash("error", "Missing permission: " + perm);
      return res.redirect("/");
    }

    done();
  };
  return handler;
}

export function hasPerm(perm: WebPermission): boolean {
  return Boolean(requestContext.get("session")?.perms?.includes(perm));
}

const formatter = new RelativeTime({
  options: {
    numeric: "auto",
  },
});
export function toRelativeTime(date: Date): string {
  return formatter.from(date);
}
