import { memberProps } from "./MemberProps";

export type TaskItemProps = {
  type: "POLL" | "ACTION" | "EVENT" | "REVIEW";
  name: string;
  completed?: boolean;
  inProgress?: boolean;
  _id: string | number;
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
