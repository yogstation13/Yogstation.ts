export interface ForumsGroup {
  user_group_id: number;
  name: string;
  priority: number;
  users: string[];
}

export interface ForumsLinkedAccount {
  account_id: string;
  account_type: string;
}

export interface ForumsUser {
  about: string;
  activity_visible: boolean;
  alert_optout: unknown[];
  allow_post_profile: string;
  allow_receive_news_feed: string;
  allow_send_personal_conversation: string;
  allow_view_identities: string;
  allow_view_profile: string;
  andrew_user_note_count: number;
  avatar_urls: Record<string, string>;
  can_ban: boolean;
  can_converse: boolean;
  can_edit: boolean;
  can_follow: boolean;
  can_ignore: boolean;
  can_post_profile: boolean;
  can_view_profile: boolean;
  can_view_profile_posts: boolean;
  can_warn: boolean;
  content_show_signature: boolean;
  creation_watch_state: string;
  custom_fields: Record<string, unknown>;
  custom_title: string;
  email: string;
  email_on_conversation: boolean;
  gravatar: string;
  interaction_watch_state: string;
  is_admin: boolean;
  is_discouraged: boolean;
  is_moderator: boolean;
  is_staff: boolean;
  is_super_admin: boolean;
  last_activity: number;
  linked_accounts: ForumsLinkedAccount[];
  location: string;
  message_count: number;
  permissions: string[];
  profile_banner_urls: Record<string, unknown>;
  push_on_conversation: boolean;
  push_optout: unknown[];
  question_solution_count: number;
  reaction_score: number;
  receive_admin_email: boolean;
  register_date: number;
  secondary_group_ids: number[];
  show_dob_date: boolean;
  show_dob_year: boolean;
  signature: string;
  timezone: string;
  trophy_points: number;
  usa_tfa: boolean;
  user_group_id: number;
  user_id: number;
  user_state: string;
  user_title: string;
  username: string;
  view_url: string;
  visible: boolean;
  vote_score: number;
  website: string;
}
