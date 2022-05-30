import Axios from "axios";
import config from "config";
import moize from "moize";
import type { ForumsGroup, ForumsUser } from "../types/forums.js";

type ForumsResponseOk<T> = T & {
  success: true;
};
type ForumsResponseErr = {
  success: false;
  errors: ForumsErrorComponent[];
};
type ForumsResponse<T> = ForumsResponseOk<T> | ForumsResponseErr;

interface ForumsErrorComponent {
  code: string;
  message: string;
  params: unknown;
}
interface ForumsError extends Error {
  forumsErrors: ForumsErrorComponent[];
}

const axios = Axios.create({
  baseURL: config.get<string>("forums.apiUrl"),
  headers: {
    "XF-Api-Key": config.get<string>("forums.apiKey"),
  },
});
axios.interceptors.response.use(
  res => Promise.resolve(res),
  err => {
    if (!(err instanceof Axios.AxiosError)) return Promise.reject(err);

    if (err.response?.headers["content-type"]?.includes("application/json")) return Promise.resolve(err.response);
    return Promise.reject(err);
  },
);

function assertSuccess<T>(data: ForumsResponse<T>, error: string): asserts data is ForumsResponseOk<T> {
  if (!data.success) throw Object.assign(Error(error) as ForumsError, { forumsErrors: data.errors });
}

export async function getUsersInGroups(...groupId: number[]): Promise<Map<number, ForumsGroup>> {
  const data = (await axios.get(`/group/users?groups=${groupId.join(",")}`)).data as ForumsResponse<{ groups: ForumsGroup[] }>;

  assertSuccess(data, "Unable to fetch usergroups");

  const ret = new Map<number, ForumsGroup>();
  for (const group of data.groups) {
    ret.set(group.user_group_id, {
      name: group.name,
      user_group_id: group.user_group_id,
      users: group.users,
      priority: group.priority,
    });
  }

  return ret;
}

export async function validateCredentials(username: string, password: string, originIp: string): Promise<ForumsUser | string> {
  const data = (
    await axios.postForm("/auth", {
      login: username,
      password,
      limit_ip: originIp,
    })
  ).data as ForumsResponse<{ user: ForumsUser }>;

  if (!data.success) {
    return data.errors[0] ? data.errors[0].message : "An unknown login error occured";
  }

  return data.user;
}

export const getFrontpageStaff = moize(
  async function () {
    const groups = await getUsersInGroups(
      config.get<number>("forums.groups.host"),
      config.get<number>("forums.groups.council"),
      config.get<number>("forums.groups.headdev"),
      config.get<number>("forums.groups.staff"),
    );

    const host = groups.get(config.get<number>("forums.groups.host"));
    const council = groups.get(config.get<number>("forums.groups.council"));
    const headdev = groups.get(config.get<number>("forums.groups.headdev"));
    const staff = groups.get(config.get<number>("forums.groups.staff"));
    if (staff) staff.users = staff.users.filter(user => !host?.users.includes(user) && !council?.users.includes(user) && !headdev?.users.includes(user));

    return {
      host,
      council,
      headdev,
      staff,
    };
  },
  {
    isPromise: true,
    maxAge: 15 * 60 * 1000,
  },
);
