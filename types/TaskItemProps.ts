import { memberProps } from "./MemberProps";

export type TaskItemProps = {
  type: "POLL" | "ACTION" | "EVENT" | "REVIEW";
  name: string;
  status: {
    completed: boolean;
    pending: boolean;
    in_progress: boolean;
  };
  inProgress?: boolean;
  _key: string | number;
  description: string;
  members: memberProps[];
  attachments?: {
    links?: {
      link: string;
      title: string;
    }[];
    images?: { image: string; title: string }[];
    files?: { title: string; file: string }[];
  };
  due_date: string;
};
