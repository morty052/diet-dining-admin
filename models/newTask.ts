import { create } from "zustand";
import { TaskItemProps } from "../types/TaskItemProps";
import { memberProps } from "../types/MemberProps";
import { baseUrl } from "../constants/baseUrl";

type newTaskProps = {
  project: string;
  name: string;
  description: string;
  members: { member_ref: { _ref: string; _type: string } }[];
  due_date: string;
  type: Partial<TaskItemProps["type"]>;
  suggestions?: string[];
  attachments?: {
    attached_files?: { file: string; title: string }[];
    attached_images?: { image: string; title: string }[];
    links?: { link: string; title: string }[];
  };
  setProject: (project: string) => void;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setType: (type: Partial<TaskItemProps["type"]>) => void;
  setTaskMembers: (members: memberProps[]) => void;
  setSuggestions: (items: string[]) => void;
  setDueDate: (date: string) => void;
  createTask: () => Promise<string>;
};

export const useNewTask = create<newTaskProps>((set, state) => ({
  project: "",
  name: "",
  description: "",
  members: [],
  due_date: "",
  type: "ACTION",
  attachments: {
    attached_files: [],
    attached_images: [],
    links: [],
  },
  setProject: (project) => {
    set(() => ({ project }));
    console.info(state().project);
  },
  setName: (name) => {
    set(() => ({ name }));
    console.info(state().name);
  },
  setDescription: (description) => {
    set(() => ({ description }));
    console.info(state().description);
  },
  setType: (type) => {
    set(() => ({ type }));
  },
  setTaskMembers: (taskMembers) => {
    const members = taskMembers.map((member) => ({
      member_ref: { _ref: member._id, _type: "member" },
    }));

    set(() => ({ members }));
    console.info(state().members);
  },
  setSuggestions: (items) => {
    set(() => ({ suggestions: items }));
    console.info(state().suggestions);
  },
  setDueDate: (due_date) => {
    set(() => ({ due_date }));
    console.info(state().due_date);
  },
  createTask: async () => {
    const { name, project, description, members, due_date, type } = state();
    const task = {
      _type: "task",
      name,
      description,
      members,
      due_date,
      type,
    };
    const res = await fetch(`${baseUrl}/admin/create-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, project }),
    });
    const data = await res.json();
    const { _id } = data;
    set(() => ({
      project: "",
      name: "",
      description: "",
      members: [],
      due_date: "",
    }));
    return _id;
  },
}));

const attachments = {
  name: "attachments",
  title: "Attachments",
  type: "object",
  fields: [
    {
      name: "attached_files",
      title: "Attached Files",
      type: "array",
      of: [
        {
          type: "object",
          name: "files",
          fields: [
            {
              name: "file",
              title: "file",
              type: "file",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            {
              name: "link",
              title: "Link",
              type: "string",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "attached_images",
      title: "Attached Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "images",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
