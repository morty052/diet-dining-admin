import { create } from "zustand";
import { memberProps } from "../types/MemberProps";
import { baseUrl } from "../constants/baseUrl";
import { getItem } from "../utils/storage";

type newProjectProps = {
  name: string;
  color: string;
  description: string;
  members: { _ref: string; _type: string }[];
  due_date: string;
  tasks: string[];
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setDueDate: (date: string) => void;
  setProjectMembers: (members: memberProps[]) => void;
  createProject: () => Promise<string>;
};

export const useNewProject = create<newProjectProps>((set, state) => ({
  name: "",
  color: "",
  description: "",
  members: [],
  due_date: "",
  tasks: [],
  setName: (name) => {
    set(() => ({ name }));
    console.info(state().name);
  },
  setDescription: (description) => {
    set(() => ({ description }));
    console.info(state().description);
  },
  setDueDate: (due_date) => {
    set(() => ({ due_date }));
    console.info(state().due_date);
  },
  setProjectMembers: (taskMembers) => {
    const members = taskMembers.map((member) => ({
      _ref: member._id,
      _type: "member",
    }));

    set(() => ({ members }));
    console.info(state().members);
  },
  createProject: async () => {
    const { name, description, members, due_date } = state();
    const admin_id = getItem("admin_id");
    const project = {
      _type: "projects",
      name,
      description,
      members,
      due_date,
      creator: {
        _ref: admin_id,
        _type: "reference",
      },
    };

    const res = await fetch(`${baseUrl}/admin/create-project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const data = await res.json();
    const { _id } = data;
    return _id;
  },
}));
